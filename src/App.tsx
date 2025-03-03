import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import First from "./Main/first";
import MoneySplitFirst from "./MoneySplit/SplitFirst";

import AI_home from "./MoneySplit/ai_Pages/ai_home";
import AI_anaLoading from "./MoneySplit/ai_Pages/ai_anaLoading";
import AI_calLoading from "./MoneySplit/ai_Pages/ai_calLoading";
import AI_calculate from "./MoneySplit/ai_Pages/ai_calculate";
import SelectAccount from "./MoneySplit/control_accounts/SelectAccount";
import SelectRatio from "./MoneySplit/control_categorys/SelectRatio";
import AI_analysis from "./MoneySplit/ai_Pages/ai_analysis";
import Authentication from "./MoneySplit/final_process/Authentication";
import TossAuth from "./MoneySplit/final_process/TossAuth";
import InputPin from "./MoneySplit/final_process/InputPin";
import SplitLoading from "./MoneySplit/final_process/SplitLoading";

import Account from "./Main/account";
import Second from "./Main/second";

import StartPage from "./SignOn/pages/StartPage";
import PersonalInfoPage from "./SignOn/pages/PersonalInfoPage";
import AgreementPage from "./SignOn/pages/AgreementPage";
import SalaryInfoPage from "./SignOn/pages/SalaryInfoPage";
import InterestPage from "./SignOn/pages/InterestPage";
import CompletionPage from "./SignOn/pages/CompletionPage";
import InputPinPage from "./SignOn/pages/InputPinPage";

import AddCategory from "./MoneySplit/control_categorys/AddCategory";
import SplitFinish from "./MoneySplit/final_process/SplitFinish";
import SelectAccountDetail from "./MoneySplit/control_accounts/SelectAccountDetail";
import SelectAccountAccounts from "./MoneySplit/control_accounts/SelectAccountAccounts";
import TossTerms from "./MoneySplit/final_process/TossTerms";
import AI_Cancel from "./MoneySplit/ai_Pages/ai_cancel";

const App: React.FC = () => {
  return (
    <Router>
      <div style={{ width: "400px", height: "800px", backgroundColor: "white", borderRadius: "15px" }}>
        <Routes>
          <Route path="/" element={<First />} />
          <Route path="/money-split" element={<MoneySplitFirst />} />

          <Route path="/money-split/ai" element={<AI_home />} />
          <Route path="/money-split/ai/analysis-loading" element={<AI_anaLoading />} />
          <Route path="/money-split/ai/calculate-loading" element={<AI_calLoading />} />
          <Route path="/money-split/ai/analysis" element={<AI_analysis />} />
          <Route path="/money-split/ai/calculate" element={<AI_calculate />} />
          <Route path="/money-split/select-account" element={<SelectAccount />} />
          <Route path="/money-split/select-ratio" element={<SelectRatio />} />
          <Route path="/money-split/authentication" element={<Authentication />} />
          <Route path="/money-split/toss-auth" element={<TossAuth />} />
          <Route path="/money-split/input-pin" element={<InputPin />} />
          <Route path="/money-split/split-loading" element={<SplitLoading />} />
          <Route path="/money-split/finish" element={<SplitFinish />} />
          <Route path="/money-split/select-account/detail" element={<SelectAccountDetail />} />
          <Route path="/money-split/select-account/accounts" element={<SelectAccountAccounts />} />
          <Route path="/money-split/add-category" element={<AddCategory />} />
          <Route path="/money-split/toss/terms" element={<TossTerms />} />
          <Route path="/money-split/ai/cancel" element={<AI_Cancel />} />

          <Route path="/Account" element={<Account />} />
          <Route path="/Second" element={<Second />} />

          <Route path="/sign" element={<StartPage />} />
          <Route path="/sign/personal-info" element={<PersonalInfoPage />} />
          <Route path="/sign/agreement" element={<AgreementPage />} />
          <Route path="/sign/salary-info" element={<SalaryInfoPage />} />
          <Route path="/sign/interest" element={<InterestPage />} />
          <Route path="/sign/completion" element={<CompletionPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
