import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import {
  setName,
  setIdFront,
  setIdBack,
  setPhone,
  setAgreements,
} from "../../redux/reducers/personalInfoSlice";
import axios from "axios";
import "../../feature-moneySplit/style/splitStyle.css";
import MoveBack from "../../shared/MoveBack";

const PersonalInfoPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name, idFront, idBack, phone, agreements } = useSelector(
    (state: RootState) => state.personalInfo
  );

  // 로컬 상태: 입력 중인 이름 저장
  const [localName, setLocalName] = useState(name);
  const [isComposing, setIsComposing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setLocalName(name);
  }, [name]);

  // 이름 입력 핸들러 (한글 및 영어만 허용)
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isComposing) {
      setLocalName(value);
      return;
    }
    const filteredValue = value.replace(/[^a-zA-Z가-힣\s]/g, "");
    setLocalName(filteredValue);
    dispatch(setName(filteredValue));
  };

  // 이름 입력 포커스 해제 시 Redux에 저장
  const handleBlur = () => {
    dispatch(setName(localName));
  };

  // 약관 전체 동의 토글
  const handleAllAgreement = () => {
    const newValue = !agreements.all;
    dispatch(
      setAgreements({
        all: newValue,
        terms: newValue,
        privacy: newValue,
        marketing: newValue,
      })
    );
  };

  // 개별 약관 동의 토글
  const handleAgreementChange = (key: keyof typeof agreements) => {
    const updatedAgreements = {
      ...agreements,
      [key]: !agreements[key],
    };
    updatedAgreements.all =
      updatedAgreements.terms &&
      updatedAgreements.privacy &&
      updatedAgreements.marketing;
    dispatch(setAgreements(updatedAgreements));
  };

  // 주민등록번호 앞 6자리 입력 (숫자만 허용)
  const handleIdFrontChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    dispatch(setIdFront(value));
  };

  // 주민등록번호 뒷자리 첫 숫자 입력 (숫자만 허용)
  const handleIdBackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 1);
    dispatch(setIdBack(value));
  };

  // 휴대폰 번호 입력 (숫자만 허용)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 11);
    dispatch(setPhone(value));
  };

  // 모든 필수 정보가 입력되었는지 확인
  const isFormValid =
    localName &&
    idFront.length === 6 &&
    idBack.length === 1 &&
    phone &&
    agreements.terms &&
    agreements.privacy;

  // 회원가입 요청
  const handleSubmit = async () => {
    setErrorMessage(""); // 오류 메시지 초기화

    try {
      const response = await axios.post(
        "https://buflbe.vercel.app/api/users",
        {
          userName: localName,
          userRegnu: `${idFront}-${idBack}******`,
          userPhone: phone,
          userPassword: "temppw",
        },
        { withCredentials: true }
      );

      if (response.status === 201) {
        localStorage.setItem("userPhone", phone);
        navigate("/sign/input-pin");
      }
    } catch (error: any) {
      console.error("회원가입 오류:", error);
      setErrorMessage(
        error.response?.data?.message || "회원가입 중 오류가 발생했습니다."
      );
    }
  };

  return (
    <div>
      {/* 뒤로 가기 버튼 */}
      <div className="underline">
        <MoveBack pageBefore="/sign" />
        <div className="center_wrap">
          <h2 className="text_info">개인정보 설정</h2>
        </div>
      </div>

      {/* 개인정보 입력 안내 문구 */}
      <p className="info_text2 center_wrap">
        안전한 저축 시작과 AI추천을 위하여, <br />
        개인정보를 입력해주세요.
      </p>

      <div>
        {/* 이름 입력 */}
        <div className="info_input_name">
          <label>이름</label>
          <input
            type="text"
            placeholder="성명"
            value={localName}
            onChange={handleNameChange}
            onBlur={handleBlur}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
          />
        </div>

        {/* 주민등록번호 입력 */}
        <div className="info_input_name info_input_id">
          <label>주민등록번호</label>
          <input
            className="input_id_1"
            type="text"
            placeholder="앞 6자리"
            value={idFront}
            onChange={handleIdFrontChange}
            maxLength={6}
          />
          <span>-</span>
          <input
            className="input_id_2"
            type="text"
            value={idBack}
            onChange={handleIdBackChange}
            maxLength={1}
          />
          <span>******</span>
        </div>

        {/* 휴대폰 번호 입력 */}
        <div className="info_input_name info_input_phone">
          <label>휴대폰 번호</label>
          <input
            type="text"
            placeholder="휴대폰 번호"
            value={phone}
            maxLength={11}
            onChange={handlePhoneChange}
          />
        </div>
      </div>

      {/* 약관 동의 UI */}
      <div className="center_wrap agree_down">
        <h3>이용약관 동의</h3>
        <div className="agree_container">
          <input
            type="checkbox"
            id="all"
            checked={agreements.all}
            onChange={handleAllAgreement}
          />
          <label htmlFor="all">모두 동의합니다.</label>

          <input
            type="checkbox"
            id="terms"
            checked={agreements.terms}
            onChange={() => handleAgreementChange("terms")}
          />
          <label htmlFor="terms">이용약관 (필수)</label>

          <input
            type="checkbox"
            id="privacy"
            checked={agreements.privacy}
            onChange={() => handleAgreementChange("privacy")}
          />
          <label htmlFor="privacy">개인정보 수집 및 이용 동의 (필수)</label>

          <input
            type="checkbox"
            id="marketing"
            checked={agreements.marketing}
            onChange={() => handleAgreementChange("marketing")}
          />
          <label htmlFor="marketing">마케팅 정보 수신 동의 (선택)</label>
        </div>
      </div>

      {/* 오류 메시지 표시 */}
      {errorMessage && <p className="error_message">{errorMessage}</p>}

      {/* 확인 버튼 */}
      <div className="center_wrap">
        <button
          disabled={!isFormValid}
          onClick={handleSubmit}
          className={`btn_start ${isFormValid ? "" : "disabled"}`}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default PersonalInfoPage;
