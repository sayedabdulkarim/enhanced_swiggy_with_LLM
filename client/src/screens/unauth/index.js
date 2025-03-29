import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import UnAuthMobileScreen from "./mobile";
import UnAuthWebScreen from "./web";
import { isMobile } from "../../utils/unauthHelper";
import { useTextCycle } from "../../hooks/useTextCycle";
//Store n api's Queries, Mutation
import {
  useLoginMutation,
  useRegisterUserMutation,
} from "../../apiSlices/userApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { handleShowAlert } from "../../utils/commonHelper";

const Index = () => {
  //misc
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const texts = ["Hungry?", "Unexpected guests?", "Cooking gone wrong?"];
  const currentText = useTextCycle(texts, 3000); // 1000ms = 1 second
  //misc
  //useState
  const [open, setOpen] = useState(true);
  const [isOtp, setIsOtp] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [signupFormData, setSignUpFormData] = useState({
    phone: "",
    name: "",
    email: "",
  });
  const [loginFormData, setLoginFormData] = useState({
    phone: "",
    otp: "",
  });
  //loader cond
  const [isLoadingOtp, setIsLoadingOtp] = useState(false);

  //queries n mutation
  const [registerUser, { isLoading: registerLoading, error: registerError }] =
    useRegisterUserMutation();

  const [login, { isLoading: loginLoading, error: loginError }] =
    useLoginMutation();
  //

  //func
  const showDrawer = useCallback((isTrue) => {
    setOpen(true);
    setIsLoginActive(isTrue);
  }, []);
  const onClose = useCallback(() => {
    setOpen(false);
  }, []);
  // signup
  const handleSingUpForm = (e) => {
    setSignUpFormData({
      ...signupFormData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const { phone, email, name } = signupFormData;
    const formattedNumber = `+91${phone}`;

    try {
      const res = await registerUser({
        name,
        email,
        phone: formattedNumber,
      }).unwrap();
      console.log(res, " resss");
      handleShowAlert(dispatch, "success", res?.message);
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      handleShowAlert(dispatch, "error", err?.data?.message);
      console.log(err, " errr");
    }
    console.log(signupFormData, " signupFormData");
  };

  ///login
  const handleLogInForm = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
  };

  // Add a mock confirmation object
  const createMockConfirmation = (phoneNumber) => {
    return {
      verificationId: "mock-verification-id",
      confirm: (code) => {
        return new Promise((resolve, reject) => {
          // Check if OTP is correct (12345)
          if (code === "12345") {
            resolve({
              user: {
                phoneNumber: phoneNumber,
              },
            });
          } else {
            reject(new Error("Invalid OTP. Please try again."));
          }
        });
      },
    };
  };

  //send OTP
  const sendOtp = async () => {
    setIsLoadingOtp(true);
    try {
      const { phone } = loginFormData;
      const formattedNumber = `+91${phone}`;

      // Use the mock confirmation instead
      const confirmation = createMockConfirmation(formattedNumber);

      if (confirmation?.verificationId) {
        handleShowAlert(
          dispatch,
          "success",
          "Mock OTP sent! Use 12345 as your OTP code."
        );
        setIsOtp(true);
        setUser(confirmation);
        setIsLoadingOtp(false);
      }
    } catch (error) {
      console.log(error, " errorr");
      handleShowAlert(
        dispatch,
        "error",
        "Something went wrong.Please try after sometime."
      );
      setIsLoadingOtp(false);
    }
  };

  const handleLogInContinue = (e) => {
    e.preventDefault();
    console.log(loginFormData, " loginFormData");
    sendOtp();
  };

  const handleVerifyOtp = async (e) => {
    setIsLoadingOtp(true);
    e.preventDefault();
    try {
      const { otp } = loginFormData;
      const data = await user.confirm(otp);
      console.log(data, " succesully login dataaaa");
      // data.user.phoneNumber
      if (data.user.phoneNumber) {
        handleLogInSubmit(data.user.phoneNumber);
      }
    } catch (error) {
      setIsLoadingOtp(false);
      handleShowAlert(dispatch, "error", "Invalid OTP. Please use 12345.");
      console.log(error, " eerr from opttt");
    }
  };

  const handleLogInSubmit = async (phone) => {
    try {
      const res = await login({ phone }).unwrap();
      dispatch(setCredentials({ ...res }));
      setIsOtp(false);
      setIsLoadingOtp(false);
      handleShowAlert(dispatch, "success", res?.message);
      console.log(res, " ressssss");
    } catch (err) {
      setIsLoadingOtp(false);
      handleShowAlert(dispatch, "error", err?.message);
      console.log(err.data.message, " errrrrrrrr from login");
    }
  };
  // console.log(open, " opennnnn");
  return (
    <div>
      {/* <button onClick={() => console.log({ userInfo, name })}>CLick</button> */}
      <div id="recaptcha"></div>
      {isMobile() ? (
        <UnAuthMobileScreen
          loginFormData={loginFormData}
          handleLogInForm={handleLogInForm}
          isOtp={isOtp}
          handleLogInContinue={handleLogInContinue}
          handleVerifyOtp={handleVerifyOtp}
          handleLogInSubmit={handleLogInSubmit}
        />
      ) : (
        <UnAuthWebScreen
          currentText={currentText}
          open={open}
          //drawer
          showDrawer={showDrawer}
          onClose={onClose}
          isLoginActive={isLoginActive}
          setIsLoginActive={setIsLoginActive}
          //form
          registerLoading={registerLoading}
          signupFormData={signupFormData}
          handleSingUpForm={handleSingUpForm}
          handleSignUpSubmit={handleSignUpSubmit}
          //
          isLoadingOtp={isLoadingOtp}
          loginLoading={loginLoading}
          loginFormData={loginFormData}
          handleLogInForm={handleLogInForm}
          handleLogInContinue={handleLogInContinue}
          handleVerifyOtp={handleVerifyOtp}
          handleLogInSubmit={handleLogInSubmit}
          isOtp={isOtp}
        />
      )}
    </div>
  );
};

export default Index;
