import React, { useEffect, useState } from "react";
import "./bottomStyle.css";
import home from "./img/home_icon.png";
import goal from "./img/goal_icon.png";
import menu from "./img/menu_icon.png";
import { useNavigate } from "react-router-dom";

interface BottomProps {
  page: string;
}

const Bottom: React.FC<BottomProps> = ({ page }) => {
  const [isHome, setIsHome] = useState<boolean>(false);
  const [isGoal, setIsGoal] = useState<boolean>(false);
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (page === "home") {
      setIsHome(true);
    }
    if (page === "goal") {
      setIsGoal(true);
    }
    if (page === "menu") {
      setIsMenu(true);
    }
  }, []);

  const moveTo = (where: string) => {
    if (where === "home") navigate("/");
    if (where === "goal") {
      navigate("/Second");
    } // 현재 목표가 없을때, 있을 때 목표페이지 경로 수정 필요
    if (where === "menu") navigate("/setting");
  };

  return (
    <div className="bottom">
      <div className="bottombox" onClick={() => moveTo("home")}>
        <img className="home" src={home} alt="home" style={isHome ? { opacity: "1" } : undefined} />
        <div className="home-text" style={isHome ? { color: "black" } : undefined}>
          홈
        </div>
      </div>
      <div className="bottombox" onClick={() => moveTo("goal")}>
        <img className="goal" src={goal} alt="goal" style={isGoal ? { opacity: "1" } : undefined} />
        <div className="goal-text_" style={isGoal ? { color: "black" } : undefined}>
          목표&관리
        </div>
      </div>
      <div className="bottombox" onClick={() => moveTo("menu")}>
        <img className="menu" src={menu} alt="menu" style={isMenu ? { opacity: "1" } : undefined} />
        <div className="menu-text" style={isMenu ? { color: "black" } : undefined}>
          설정
        </div>
      </div>
    </div>
  );
};

export default Bottom;
