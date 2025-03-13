import { useNavigate } from "react-router-dom";
import LogoImg from "../images/logo.png";
import "../style/style.css";

function StartPage() {
  const navigate = useNavigate();

  // "시작하기" 버튼 클릭 시 이동하는 함수
  const handleStartClick = () => {
    navigate("/sign/personal-info");
  };

  return (
    <div className="center_wrap">
      <div className="content_start">
        <img src={LogoImg} alt="버플 로고" width="100px" className="logo-float" />
        <p className="start_text">
          버플과 함께 <br />
          소중한 내 월급 관리를 <br />
          한번에!
        </p>
      </div>
      <button className="btn_start" onClick={handleStartClick}>
        시작하기
      </button>
    </div>
  );
}

export default StartPage;
