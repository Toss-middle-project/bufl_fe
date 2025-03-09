import React from "react";
import "../../style/splitStyle.css";
import { useNavigate } from "react-router-dom";
import MoveBack from "../../MoveBack";
import DonutChart from "./ai_doughnut";

const AI_calculate: React.FC = () => {
  const navigate = useNavigate();
  const clickForYes = () => {
    navigate("/money-split/select-account");
  };
  const clickForNo = () => {
    navigate("/money-split/select-ratio");
  };
  return (
    <div>
      <MoveBack pageBefore={"/money-split/ai/analysis"} />
      <div className="center_wrapper">
        <div>
          <div className="black_title">
            AI가 추천하는
            <br />
            월급 분배 비율이에요!
          </div>
          <div className="content_box">
            <div className="black_title">월급 2,000,000원에서</div>
            <div>
              <ul className="analysis_list">
                <li>
                  생활비 40%<span> (약 800,000원)</span>
                </li>
                <li>
                  적금 30%<span> (약 600,000원)</span>
                </li>
                <li>
                  비상금, 예비비 10%<span> (약 200,000원)</span>
                </li>
                <li>
                  재테크 20%<span> (약 400,000원)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="center_wrapper">
            <div style={{ width: "150px", marginTop: "20px" }}>
              <DonutChart dataList={[40, 30, 10, 20]} />
            </div>
          </div>
          <div className="center_wrapper">
            <div className="center_wrapper btn">
              <button className="gray_small_btn" type="button" onClick={() => clickForNo()}>
                수정할래요
              </button>
              <button className="blue_small_btn" type="button" onClick={() => clickForYes()}>
                좋아요!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AI_calculate;
