import React, { useEffect, useState } from "react";
import "../../style/splitStyle.css";
import { useNavigate } from "react-router-dom";
import MoveBack from "../../MoveBack";
import RightArrow from "../../images/right-arrow.png";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedAccount } from "../../../redux/actions/accountAction";
import { RootState } from "../../../redux/store";
import { CategoryInterface, CategoryAccountProps, CategoryAccountsInterface } from "./interfaces";

const CategoryAccount: React.FC<CategoryAccountProps> = (props) => {
  const navigate = useNavigate();
  const clickForAccountLink = () => {
    navigate(`/money-split/select-account/detail/${props.categoryId}`);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSelectedAccount({ selectedAccountId: -1, selectedAccountName: "" }));
  }, []);
  return (
    <div>
      <div className="account_list" onClick={clickForAccountLink}>
        <div className="list_div">
          <div>
            <div>
              <strong>{props.category}</strong>
            </div>

            <div>
              {props.account.bankName === "정보 없음"
                ? "계좌 연결하기"
                : props.account.bankName + " " + props.account.accountNumber + " ✅"}
            </div>
          </div>
          <img src={RightArrow} alt="right" width={15} />
        </div>
        <div className="list_div" style={{ marginTop: "15px" }}>
          <div className="font_20" style={{ color: "#3182F6" }}>
            {Number(props.ratio)}%
          </div>
          <div className="font_20" style={{ color: "#858585" }}>
            {props.amount}원
          </div>
        </div>
      </div>
    </div>
  );
};

function SelectAccount() {
  const [isFinish, setIsFinish] = React.useState(true);
  const [categorys, setCategorys] = useState<CategoryInterface[]>([]);
  const [categoryAccounts, setCategoryAccounts] = useState<CategoryAccountsInterface[]>([]);
  const dispatch = useDispatch();
  const categoryList = useSelector((state: RootState) => state.category.categoryList);
  // 리덕스 리스트 길이 n만큼 categorys 뒤에서 n개 자르기
  const listLen = categoryList.length;

  useEffect(() => {
    console.log(listLen);
    fetch("http://localhost:5000/api/salary/category")
      .then((response) => response.json())
      .then((data) => {
        setCategorys(data.categories.slice(-listLen));
        console.log("**category", categoryList);
      })
      .catch((error) => console.error("SelectAccount error:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/salary/account")
      .then((response) => response.json())
      .then((data) => {
        setCategoryAccounts(data.slice(-2));
        console.log("**accounts", categoryAccounts);
      })
      .catch((error) => console.error("SelectAccount error:", error));
  }, [categoryList]);

  const navigate = useNavigate();
  const clickForYes = () => {
    navigate("/money-split/authentication");
  };
  return (
    <div>
      <MoveBack pageBefore="/money-split/select-ratio" now="account" />
      <div className="center_wrapper">
        <div>
          <div className="black_title">카테고리별 계좌를 선택해주세요.</div>
          <div style={{ height: "550px", overflowY: "scroll" }}>
            {categorys.map((category, index) => (
              <div>
                <CategoryAccount
                  categoryId={category.id}
                  category={category.name}
                  ratio={category.ratio}
                  amount={category.amount}
                  account={categoryAccounts[index] ?? { name: "", bankName: "정보 없음", accountNumber: "" }}
                />
              </div>
            ))}
          </div>
          <div className="center_wrapper">
            <button
              className={isFinish ? "blue_big_btn" : "gray_big_btn"}
              type="button"
              onClick={isFinish ? () => clickForYes() : undefined}
            >
              완료했어요.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectAccount;
