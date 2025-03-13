import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/style.css";
import IntImage1 from "../images/int1.png";
import IntImage2 from "../images/int2.png";
import IntImage3 from "../images/int3.png";
import IntImage4 from "../images/int4.png";
import IntImage5 from "../images/int5.png";
import IntImage6 from "../images/int6.png";
import "../../feature-moneySplit/style/splitStyle.css";
import MoveBack from "../../shared/MoveBack";

// 관심사 목록 데이터
const interests = [
  { id: 1, name: "빠르게 목돈 만들기", img: IntImage1 },
  { id: 2, name: "여행 및 경험 중심", img: IntImage2 },
  { id: 3, name: "미래를 위한 투자", img: IntImage3 },
  { id: 4, name: "교육 및 자기 개발 투자", img: IntImage4 },
  { id: 5, name: "내 집 마련", img: IntImage5 },
  { id: 6, name: "균형 잡힌 재정 관리", img: IntImage6 },
];

const InterestPage = () => {
  const navigate = useNavigate();
  const [selectedInterest, setSelectedInterest] = useState<{
    id: number;
    name: string;
  } | null>(null);

  // 관심사 선택 핸들러
  const handleSelectInterest = (interest: { id: number; name: string }) => {
    setSelectedInterest((prev) => (prev?.id === interest.id ? null : interest));
  };

  // 관심사 저장 API 호출
  const handleSaveInterest = async () => {
    if (!selectedInterest) return;

    try {
      await axios.post(
        "https://buflbe.vercel.app/api/users/interests",
        { interest: selectedInterest.name },
        { withCredentials: true }
      );
      navigate("/sign/completion");
    } catch (error) {
      console.error("관심사 저장 실패:", error);
    }
  };

  return (
    <div>
      <MoveBack pageBefore="/sign/salary-info" />
      <div className="center_wrap">
        {/* 관심사 선택 안내 문구 */}
        <div className="interest__title-wrap">
          <h3>다음 중, 관심사가 있다면 선택해주세요.</h3>
        </div>

        {/* 관심사 선택 UI */}
        <div>
          {interests.map((interest) => (
            <img
              key={interest.id}
              src={interest.img}
              alt={interest.name}
              width="160px"
              style={{
                cursor: "pointer",
                borderRadius: "30px",
                backgroundColor:
                  selectedInterest?.id === interest.id
                    ? "#3182f6"
                    : "transparent",
                border:
                  selectedInterest?.id === interest.id
                    ? "4px solid #3182f6"
                    : "2px solid transparent",
                margin: "5px 7px",
              }}
              onClick={() => handleSelectInterest(interest)}
            />
          ))}
        </div>

        {/* 저장 버튼 */}
        <div className="center_wrap">
          <button
            className={`btn_start ${
              selectedInterest === null ? "disabled" : ""
            }`}
            onClick={handleSaveInterest}
            disabled={selectedInterest === null}
          >
            저장하기
          </button>
        </div>

        {/* 건너뛰기 버튼 */}
        <br />
        <span
          onClick={() => navigate("/sign/completion")}
          style={{
            color: "gray",
            borderBottom: "solid 2px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          건너뛰기
        </span>
      </div>
    </div>
  );
};

export default InterestPage;
