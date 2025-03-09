import React from "react";
import "./secondStyle.css";
import pay from "./img/pay.png";

function Second() {
  return (
    <div>
      <img className="pay" src={pay} alt="pay" />
      <div className="pay1">저축 목표 세우기</div>
      <div className="pay2">
        마음껏 만들고,
        <br /> 부담없이 설정하세요
      </div>
      <div className="pay3">
        저축 목표를 직접 설정하거나,
        <br /> AI를 통해 최적의 목표를 추천받으세요!
      </div>
      <div className="bottom1">
        <div className="home-text1">홈</div>
        <div className="target-text1">목표&관리</div>
        <div className="menu-text1">설정</div>
        <div className="box1">
          <div className="box1-text">AI 추천 받기</div>
        </div>
        <div className="box2">
          <div className="box2-text">목표 설정하기</div>
        </div>
      </div>
    </div>
  );
}

export default Second;
