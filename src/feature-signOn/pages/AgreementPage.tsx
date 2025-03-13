import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/style.css";
import AgreeImg from "../images/agree.png";
import "../../feature-moneySplit/style/splitStyle.css";
import MoveBack from "../../shared/MoveBack";

function AgreementPage() {
  const navigate = useNavigate();
  const [isAgreementOpen, setIsAgreementOpen] = useState(false); // 약관 창 열림 여부
  const [isAgreed, setIsAgreed] = useState(false); // 동의 여부 상태

  return (
    <div>
      <MoveBack pageBefore="/sign/personal-info" />
      {!isAgreementOpen ? (
        <div className="center_wrap">
          {/* 동의 안내 화면 */}
          <img src={AgreeImg} width={220} alt="agree" className="agree_img" />
          <h3 className="agree_text1">
            자산 연결을 위해
            <br />
            마이데이터 동의가 필요해요.
          </h3>
          <p className="agree_text2">
            마이데이터 서비스는 신뢰할 수 있는 보안 기술을 적용하고 있어요.
            <br />
            필요하지 않은 정보 제공은 언제든지 거부할 수 있습니다.
            <br />
            등록된 자산 정보는 금융포털에서 직접 관리할 수 있어요.
          </p>
          <span className="agree_text3" onClick={() => setIsAgreementOpen(true)}>
            [필수] 마이데이터 서비스 이용약관
          </span>
          <br />
          <br />
          {/* 동의 후 다음 단계로 이동 */}
          <button
            onClick={() => navigate("/sign/salary-info")}
            disabled={!isAgreed}
            className={`btn_start ${isAgreed ? "" : "disabled"}`}
          >
            동의하고 다음
          </button>
        </div>
      ) : (
        <div className="center_wrap">
          {/* 이용약관 내용 */}
          <div className="agree_box">
            <p className="agree_text4">
              <span className="agree_text5">마이데이터 기본약관</span>
              <br />
              <br />
              제1조 (목적) <br />
              이 약관은 “OOOO주식회사”(이하 “회사”라 한다)가 제공하는 마이데이터 서비스 (이하 “서비스”라 한다)의 이용과
              관련하여 회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
              <br />
              <br />
              {/* 약관 내용 생략 */}
              <br />
              제1조(시행일)이 약관은 2022년 월 일부터 시행합니다.
            </p>
          </div>
          {/* 동의 버튼 */}
          <button
            className="btn_start"
            onClick={() => {
              setIsAgreed(true);
              setIsAgreementOpen(false);
            }}
          >
            동의하기
          </button>
        </div>
      )}
    </div>
  );
}

export default AgreementPage;
