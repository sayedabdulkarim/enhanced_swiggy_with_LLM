import React, { useState } from "react";
//cmps
import Login from "./login";
import Landing from "./landing";

const Index = ({
  loginFormData,
  handleLogInForm,
  isOtp,
  handleLogInContinue,
  handleVerifyOtp,
}) => {
  const [isLogin, setIsLogin] = useState(false);

  const toggleLogin = (val) => {
    setIsLogin(val);
  };

  return (
    <div className="mobile_view">
      {isLogin ? (
        <Login
          toggleLogin={toggleLogin}
          loginFormData={loginFormData}
          handleLogInForm={handleLogInForm}
          isOtp={isOtp}
          handleLogInContinue={handleLogInContinue}
          handleVerifyOtp={handleVerifyOtp}
        />
      ) : (
        <Landing toggleLogin={toggleLogin} />
      )}
    </div>
  );
};

export default Index;
