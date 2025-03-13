import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../feature-moneySplit/style/splitStyle.css";
import MoveBack from "../../shared/MoveBack";
import "../style/style.css";

const InputPinPage: React.FC = () => {
  const [pin, setPin] = useState<string[]>(Array(6).fill(""));
  const [firstPin, setFirstPin] = useState<string | null>(null);
  const [step, setStep] = useState<"set" | "confirm">("set");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isWrong, setIsWrong] = useState(false);
  const navigate = useNavigate();

  // 숫자 입력 핸들러
  const handleKeyPress = (num: string) => {
    setPin((prev) => {
      const newPin = [...prev];
      const emptyIndex = newPin.findIndex((val) => val === "");
      if (emptyIndex !== -1) newPin[emptyIndex] = num;
      return newPin;
    });
  };

  // 숫자 삭제 핸들러
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

  useEffect(() => {
    if (pin.every((p) => p !== "")) {
      if (step === "set") {
        setFirstPin(pin.join(""));
        setPin(Array(6).fill(""));
        setStep("confirm");
      } else if (step === "confirm") {
        if (firstPin === pin.join("")) {
          updatePassword(firstPin);
        } else {
          setIsWrong(true);
          setErrorMessage("PIN 번호가 일치하지 않습니다.");

          setTimeout(() => {
            setIsWrong(false);
            setPin(Array(6).fill(""));
          }, 700);
        }
      }
    }
  }, [pin]);

  // 비밀번호 업데이트 API 호출
  const updatePassword = async (newPassword: string) => {
    setErrorMessage(null);
    const userPhone = localStorage.getItem("userPhone");

    if (!userPhone) {
      setErrorMessage("회원가입 정보를 찾을 수 없습니다.");
      return;
    }

    try {
      const response = await axios.put(
        "https://buflbe.vercel.app/api/users/update-password",
        {
          userPhone,
          userPassword: newPassword,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        navigate("/sign/salary-info");
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
          {/* 단계에 따라 메시지 변경 */}
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

          {/* 오류 메시지 출력 */}
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          {/* PIN 입력 UI */}
          <div className={`pin-input-container ${isWrong ? "shake" : ""}`}>
            {pin.map((num, index) => (
              <div
                key={index}
                className={`pin-dot ${
                  num ? (isWrong ? "wrong" : "filled") : ""
                }`}
              ></div>
            ))}
          </div>

          {/* 키패드 UI */}
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
