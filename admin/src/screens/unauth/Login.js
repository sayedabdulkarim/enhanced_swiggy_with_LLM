import React, { useState } from "react";
import { AuthInfoIcon } from "../../utils/svgs";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../apiSlices/userApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { handleShowAlert } from "../../utils/commonHelper";

const Login = () => {
  //misc
  const dispatch = useDispatch();
  //state
  const [formData, setFormData] = useState({
    email_number: "",
    password: "",
  });

  //queries n mutation
  const [loginUser, { isLoading: loginLoading, error: loginError }] =
    useLoginMutation();

  //func
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData, " formmm");
    const { email_number, password } = formData;

    try {
      const res = await loginUser({
        email_number,
        password,
      }).unwrap();
      console.log(res, " resss");
      handleShowAlert(dispatch, "success", res?.message);
      dispatch(setCredentials({ ...res }));
      // navigate("/");
    } catch (err) {
      handleShowAlert(dispatch, "error", err?.data?.message);
      console.log(err, " errr");
    }
  };

  const { email_number, password } = formData;
  const isEnable = email_number && password;

  return (
    <div className="form_container">
      {/*  */}
      <div className="title_container">
        <div className="info_text">
          Enter a mobile number or restaurant ID to continue
        </div>
        <div className="info_icon">
          <AuthInfoIcon />
        </div>
      </div>
      {/*  */}
      <form onSubmit={handleSubmit}>
        {/* input */}
        <div className=" input_item">
          <input
            name="email_number"
            placeholder="Enter Email ID / Mobile number"
            autoCapitalize="sentences"
            autoComplete="on"
            autoCorrect="on"
            inputMode="decimal"
            spellCheck="true"
            className=""
            type="text"
            value={formData?.email_number}
            onChange={handleChange}
          />
        </div>
        {/*  */}
        <div className=" input_item">
          <input
            name="password"
            type="password"
            placeholder="Enter Password"
            autoCapitalize="sentences"
            autoComplete="on"
            autoCorrect="on"
            inputMode="decimal"
            spellCheck="true"
            className=""
            value={formData?.password}
            onChange={handleChange}
          />
        </div>
        {/* button */}
        <button
          className={`submit_button ${isEnable ? "isActive" : ""}`}
          type="submit"
        >
          <div className="btn_text">Continue</div>
        </button>
        {/*  */}
      </form>
    </div>
  );
};

export default Login;
