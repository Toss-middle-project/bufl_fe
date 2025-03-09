import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../MoneySplit/style/splitStyle.css";
import MoveBack from "../../MoneySplit/MoveBack";

const InputPinPage: React.FC = () => {
  const [pin, setPin] = useState<string[]>(Array(6).fill(""));
  const [firstPin, setFirstPin] = useState<string | null>(null);
  const [step, setStep] = useState<"set" | "confirm">("set"); // PIN 설정 단계
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleKeyPress = (num: string) => {
    setPin((prev) => {
      const newPin = [...prev];
      const emptyIndex = newPin.findIndex((val) => val === "");
      if (emptyIndex !== -1) newPin[emptyIndex] = num;
      return newPin;
    });
  };

  const handleDelete = () => {
    setPin((prev) => {
      const newPin = [...prev];
      const lastIndex = newPin.lastIndexOf("");
      if (lastIndex > 0) {
        newPin[lastIndex - 1] = "";
      } else {
        newPin[newPin.length - 1] = "";
      }
      return newPin;
    });
  };

  // PIN이 완성될 때 처리
  useEffect(() => {
    if (pin.every((p) => p !== "")) {
      if (step === "set") {
        setFirstPin(pin.join("")); // 첫 번째 입력 저장
        setPin(Array(6).fill("")); // 입력 초기화
        setStep("confirm"); // 확인 단계로 변경
      } else if (step === "confirm") {
        if (firstPin === pin.join("")) {
          updatePassword(firstPin); // PIN이 일치하면 비밀번호 업데이트
        } else {
          setErrorMessage("PIN 번호가 일치하지 않습니다. 다시 입력해주세요.");
          setPin(Array(6).fill("")); // 입력 초기화
        }
      }
    }
  }, [pin]);

 
  const updatePassword = async (newPassword: string) => {
    setErrorMessage(null);
    const userPhone = localStorage.getItem("userPhone"); // 회원가입 시 저장된 휴대폰 번호 가져오기

    if (!userPhone) {
      setErrorMessage("회원가입 정보를 찾을 수 없습니다.");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:5000/api/users/update-password",
        {
          userPhone, 
          userPassword: newPassword, 
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert("PIN 설정 완료!");
        navigate("/sign/salary-info"); // 
      }
    } catch (error: any) {
      console.error("비밀번호 업데이트 오류:", error);
      setErrorMessage("비밀번호 업데이트에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div>
      <MoveBack pageBefore="/sign/personal-info" />
      <div className="center_wrap">
        <div className="pin-input--relative">
          <div className="black_title center_text">
            {step === "set" ? (
              <>
                간편로그인 및 <br />
                자동이체 등록을 위해 <br />
                PIN 번호를 설정해주세요.
              </>
            ) : (
              <>
                확인을 위해 한 번 더 <br />
                입력해주세요. <br />
                <br />
              </>
            )}
          </div>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <div className="pin-input-container">
            {pin.map((num, index) => (
              <div
                key={index}
                className={`pin-dot ${num ? "filled" : ""}`}
              ></div>
            ))}
          </div>

          <div className="keypad">
            {[...Array(9)].map((_, index) => (
              <button
                key={index + 1}
                className="keypad-button"
                onClick={() => handleKeyPress((index + 1).toString())}
              >
                {index + 1}
              </button>
            ))}
            <div></div>
            <button
              className="keypad-button"
              onClick={() => handleKeyPress("0")}
            >
              0
            </button>
            <button className="keypad-button" onClick={handleDelete}>
              ⬅
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputPinPage;
