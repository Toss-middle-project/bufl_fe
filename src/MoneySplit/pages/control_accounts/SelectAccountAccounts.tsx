import React, { useEffect, useState } from "react";
import "../../style/splitStyle.css"; // CSS 파일 import
import { useNavigate, useParams } from "react-router-dom";
import MoveBack from "../../MoveBack";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedAccount } from "../../../redux/actions/accountAction";
import { RootState } from "../../../redux/store";
import { AccountsInterface, SelectedAccountInterface } from "./interfaces";

const SelectAccountAccounts: React.FC = () => {
  // const allAccountList = ["토스뱅크 123", "토스뱅크 456", "토스뱅크 789", "토스뱅크 000"];
  const [account, setAccount] = useState<SelectedAccountInterface>({ selectedAccountId: -1, selectedAccountName: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedAccountId = useSelector((state: RootState) => state.account.selectedAccountId);
  const selectedAccountName = useSelector((state: RootState) => state.account.selectedAccountName);

  const { categoryId } = useParams();
  const clickForYes = async () => {
    console.log(account);
    dispatch(setSelectedAccount(account));
    navigate(`/money-split/select-account/detail/${categoryId}`);
  };

  const [accounts, setAccounts] = useState<AccountsInterface[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/accounts")
      .then((response) => response.json())
      .then((data) => setAccounts(data.accounts))
      .catch((error) => console.error("SelectAccountAccounts error:", error));
  }, []);

  useEffect(() => {
    dispatch(setSelectedAccount(account));
    console.log(selectedAccountId, selectedAccountName);
  }, [account, dispatch]);

  return (
    <div>
      <MoveBack pageBefore="/money-split/select-account/detail" />
      <div className="center_wrapper">
        <div>
          <div>“생활비” 목적으로 사용할 통장을 선택해주세요.</div>
          <div>
            <ul className="analysis_list">
              {accounts.map((account, index) => (
                <li>
                  <input
                    type="radio"
                    id={`account-${index}`}
                    name="account"
                    onClick={() =>
                      setAccount({
                        selectedAccountId: account.account_id,
                        selectedAccountName: account.bank_name + " " + String(account.account_number),
                      })
                    }
                    onChange={() => {}}
                  />{" "}
                  <label htmlFor={`account-${index}`}>{account.bank_name + account.account_number}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className="center_wrapper">
            <div className="center_wrapper btn">
              <button className="blue_big_btn" type="button" onClick={() => clickForYes()}>
                완료했어요.
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectAccountAccounts;
