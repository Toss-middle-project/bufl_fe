import React from "react";
import "./mainStyle.css";
import BellImg from "./img/Frame 20.png";
import BankIcon1 from "./img/toss.png";
import BankIcon2 from "./img/shinhan.png";
import BankIcon3 from "./img/hana.png";
import BankIcon4 from "./img/kb.png";
import DoughnutChart from "./DoughnutChart";

function First() {
  return (
    <div>
      <div className="bufl">BUFL</div>
      <img className="bell" src={BellImg} alt="Bell" />
      <div className="bank-icon">
        <div className="bank-icon1">
          <img className="toss" src={BankIcon1} alt="Toss" />
          <div className="money">900,000원</div>
        </div>
        <div className="bank-icon2">
          <img className="shinhan" src={BankIcon2} alt="Shinhan" />
          <div className="money">10,000원</div>
        </div>
        <div className="bank-icon3">
          <img className="hana" src={BankIcon3} alt="Hana" />
          <div className="money">1,600,000원</div>
        </div>
        <div className="bank-icon4">
          <img className="kb" src={BankIcon4} alt="Kb" />
          <div className="money">80,000원</div>
        </div>
        <div className="more">더 보기 ▼</div>
      </div>
      <div className="month">
        <div className="month1">2월 총 지출</div>
        <div className="month2">326,510 원</div>
      </div>
      <div className="asset-box">
        <div className="donut"><DoughnutChart /></div>
        <div className="asset">자산</div>
        <div className="asset1">비상금</div>
        <div className="asset2">예비비</div>
        <div className="asset3">생활비</div>
        <div className="asset4">저축</div>
        <div className="asset5">내 월급 :</div>
        <div className="asset6">당신은 "    "입니다.</div>
      </div>
    </div>
  );
}
export default First;