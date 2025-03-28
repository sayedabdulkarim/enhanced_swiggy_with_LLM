import React, { useState } from "react";
import { AuthInfoIcon } from "../../utils/svgs";
import { useDispatch } from "react-redux";
import { useRegisterUserMutation } from "../../apiSlices/userApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { handleShowAlert } from "../../utils/commonHelper";

const Signup = () => {
  //misc
  const dispatch = useDispatch();
  //state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  //queries n mutation
  const [registerUser, { isLoading: registerLoading, error: registerError }] =
    useRegisterUserMutation();

  //func
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, phone, email, password } = formData;
    const formattedNumber = `+91${phone}`;

    try {
      const res = await registerUser({
        name: username,
        email,
        phone: formattedNumber,
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
    // console.log(signupFormData, " signupFormData");
  };

  //
  const { username, email, phone, password } = formData;
  const isEnable = username && email && phone && password;

  return (
    <div className="form_container">
      {/*  */}
      <div className="title_container">
        <div className="info_text">
          Join us by registering with your Email & Mobile number
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
            name="username"
            placeholder="Enter Username"
            autoCapitalize="sentences"
            autoComplete="on"
            autoCorrect="on"
            inputMode="decimal"
            spellCheck="true"
            className=""
            type="text"
            value={formData?.username}
            onChange={handleChange}
          />
        </div>

        <div className=" input_item">
          <input
            name="email"
            placeholder="Enter Email ID"
            autoCapitalize="sentences"
            autoComplete="on"
            autoCorrect="on"
            inputMode="decimal"
            spellCheck="true"
            className=""
            type="text"
            value={formData?.email}
            onChange={handleChange}
          />
        </div>

        <div className=" input_item">
          <input
            maxLength={10}
            name="phone"
            placeholder="Enter Mobile number"
            autoCapitalize="sentences"
            autoComplete="on"
            autoCorrect="on"
            inputMode="decimal"
            spellCheck="true"
            className=""
            type="text"
            value={formData?.phone}
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
        {/* <button className="submit_button isActive" type="submit"> */}
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

export default Signup;
