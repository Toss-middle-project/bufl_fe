import React from "react";
import "./account.css";
import account from "./account.svg";
import Group1 from "./img/Group1.png";

function Account() {
  return <div>
    <div className="account">
      <img className="account1" src={account} alt="account" />
      <div className="account2">+</div>
    </div>
    <div className="bottom">
      <div className="home-text">홈</div>
      <div className="target-text">목표&관리</div>
      <div className="menu-text">설정</div>
    </div>
    <img className="group1" src={Group1} alt="Group1" />
  </div>
}

export default Account;