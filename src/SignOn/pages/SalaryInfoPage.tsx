import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import "../style/style.css";
import MoneyImg from "../images/money.png";
import DateImg from "../images/date.png";
import AccountImg from "../images/account.png";
import "../../MoneySplit/style/splitStyle.css";
import MoveBack from "../../MoneySplit/MoveBack";

function SalaryInfoPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [salary, setSalary] = useState(
    () => Number(localStorage.getItem("salary")) || 2500000
  );
  const [payday, setPayday] = useState(
    () => localStorage.getItem("payday") || "20일"
  );
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [accountList, setAccountList] = useState<
    {
      account_id: number;
      bank_name: string;
      account_number: string;
      logo: string;
    }[]
  >([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // DB에서 계좌 목록 가져오기
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/accounts", {
          withCredentials: true, // 세션 기반 인증 지원
        });
        setAccountList(response.data.accounts); // API 응답 데이터로 계좌 목록 설정
      } catch (error) {
        console.error("계좌 정보를 불러오는 데 실패했습니다:", error);
      }
    };

    fetchAccounts();
  }, []);

  // 월급 입력값 포맷팅
  const formatSalary = (value: number) => value.toLocaleString();

  // 월급 입력 핸들러
  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, ""); // 숫자만 입력받음
    setSalary(rawValue ? Number(rawValue) : 0);
  };

  // 월급 기본값 유지
  const handleBlur = () => {
    if (!salary) setSalary(2500000);
  };

  // + / - 버튼 조작
  const adjustSalary = (amount: number) => {
    setSalary((prevSalary) => Math.max(0, prevSalary + amount));
  };

  // 월급일 옵션 리스트
  const paydayOptions = Array.from(
    { length: 31 },
    (_, i) => `${i + 1}일`
  ).concat("말일");

  // 다음 월급일 계산 (월급일 + 1일)
  const getNextDay = (day: string) => {
    if (day === "말일") return "1일";
    const dayNumber = parseInt(day.replace("일", ""), 10);
    return isNaN(dayNumber) || dayNumber >= 28 ? "1일" : `${dayNumber + 1}일`;
  };

  // 월급 정보 서버 저장
  const submitSalaryInfo = async () => {
    if (!selectedAccount) {
      alert("월급 계좌를 선택하세요!");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/users/salary",
        {
          amount: salary,
          payDate: payday,
          accountId: selectedAccount, // 선택한 계좌의 account_id 전송
        },
        { withCredentials: true }
      );

      navigate("/sign/interest"); // 다음 페이지로 이동
    } catch (error) {
      const axiosError = error as AxiosError;
      alert("월급 정보를 저장하는 데 실패했습니다.");
      console.error(
        "월급 정보 저장 실패:",
        axiosError.response ? axiosError.response.data : axiosError.message
      );
    }
  };

  return (
    <div className="container">
      <MoveBack pageBefore="/sign/input-pin" />
      <h3 className="salary_text1">
        월급 자동 분배를 위해
        <br />
        정보가 필요해요.
      </h3>

      {step === 1 ? (
        <div>
          <div className="salary_flex">
            <img src={MoneyImg} alt="money" width="45px" height="45px" />
            <div className="salary_text_group">
              <p className="salary_text2">월 실수령</p>
              <p className="salary_text3">실수령 월급을 입력해주세요.</p>
            </div>
          </div>

          <div className="salary_input_container">
            <button
              className="salary_button"
              onClick={() => adjustSalary(500000)}
            >
              +
            </button>
            <input
              ref={inputRef}
              type="text"
              value={formatSalary(salary)}
              onChange={handleSalaryChange}
              onBlur={handleBlur}
              className="salary_input"
            />
            <button
              className="salary_button"
              onClick={() => adjustSalary(-500000)}
            >
              -
            </button>
            <span className="currency">원</span>
          </div>

          <div className="center_wrap">
            <button className="btn_start" onClick={() => setStep(2)}>
              다음
            </button>
          </div>
        </div>
      ) : step === 2 ? (
        <div>
          <div className="salary_flex">
            <img src={DateImg} alt="date" width="45px" />
            <p className="salary_text2 salary2__title--move">월급일</p>
          </div>

          <div className="payday__container">
            <div
              className="payday__select-wrapper"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="payday__select-text">{payday}</span>
              <div className="payday__select--icon">▼</div>
            </div>

            {isDropdownOpen && (
              <div className="payday__dropdown">
                {paydayOptions.map((day) => (
                  <div
                    key={day}
                    className="payday__dropdown-item"
                    onClick={() => {
                      setPayday(day);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {day}
                  </div>
                ))}
              </div>
            )}

            <p className="payday__description">
              매달 {getNextDay(payday)} 새벽에 월급 쪼개기를 진행할게요.
            </p>
          </div>

          <div className="center_wrap">
            <button className="btn_start" onClick={() => setStep(3)}>
              다음
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="salary_flex">
            <img src={AccountImg} alt="account" width="45px" />
            <p className="salary_text2 salary2__title--move">월급계좌</p>
          </div>
          <div className="account-list">
            <p className="account-title">내 계좌</p>
            {accountList.map((account) => (
              <button
                key={account.account_id}
                className={`account-item ${
                  selectedAccount === account.account_id ? "selected" : ""
                }`}
                onClick={() => setSelectedAccount(account.account_id)}
              >
                <img
                  src={require(`../images/${account.logo}`)}
                  alt={account.bank_name}
                />
                <span>
                  {account.bank_name} <strong>{account.account_number}</strong>
                </span>
              </button>
            ))}
          </div>

          <div className="center_wrap">
            <button
              className={`btn_start ${
                selectedAccount === null ? "disabled" : ""
              }`}
              onClick={submitSalaryInfo}
              disabled={selectedAccount === null}
            >
              다음
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SalaryInfoPage;
