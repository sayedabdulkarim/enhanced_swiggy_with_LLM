import React from "react";
import { Spin } from "antd";

const login = ({
  loginLoading,
  isLoadingOtp,

  loginFormData,
  handleLogInForm,
  isOtp,
  handleLogInContinue,
  handleVerifyOtp,
  handleLogInSubmit,
  setIsLoginActive,
}) => {
  const { phone, otp } = loginFormData;
  return (
    <div className="_12S7_">
      <div className="">
        <div>
          <div className="_3pYe-">
            {/* <span className="_22fFW icon-close-thin"></span> */}
            <div className="_1Tg1D">Login</div>
            <div className="HXZeD"></div>
            <div className="_2r91t">
              or{" "}
              <span className="_3p4qh" onClick={() => setIsLoginActive(false)}>
                create an account
              </span>
            </div>
            <img
              className="jdo4W"
              imageurl="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
              width="100"
              height="105"
              imageid=""
              alt="img renderer"
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
            />
          </div>
          <form onSubmit={!isOtp ? handleLogInContinue : handleVerifyOtp}>
            <div>
              <div className="_3Um38 _3lG1r">
                <input
                  className="_381fS"
                  type="tel"
                  name="phone"
                  id="mobile"
                  tabIndex="1"
                  maxLength="10"
                  autoComplete="off"
                  value={phone}
                  onChange={handleLogInForm}
                />
                <div className="_2EeI1 _26LFr"></div>
                <label className="_1Cvlf _2tL9P " htmlFor="mobile">
                  Phone number
                </label>
              </div>

              {isOtp && (
                <div className="_3Um38 _3lG1r">
                  <input
                    className="_381fS"
                    type="text"
                    name="otp"
                    id="mobile"
                    tabIndex="2"
                    maxLength="6"
                    autoComplete="off"
                    value={otp}
                    onChange={handleLogInForm}
                  />
                  <div className="_2EeI1 _26LFr"></div>
                  <label className="_1Cvlf _2tL9P " htmlFor="otp">
                    One Time Password
                  </label>
                </div>
              )}
            </div>

            {/* loginLoading,
  isLoadingOtp, */}

            <div className="_25qBi _2-hTu">
              <button
                type="submit"
                className="a-ayg"
                disabled={loginLoading || isLoadingOtp ? true : false}
              >
                {/* { isOtp ? "Verify Otp" : "CONTINUE" } */}
                {loginLoading || isLoadingOtp ? (
                  <Spin size="small" />
                ) : isOtp ? (
                  "Verify Otp"
                ) : (
                  "CONTINUE"
                )}
              </button>
            </div>
            <div className="_1FvHn">
              By clicking on Login, I accept the{" "}
              <a className="IBw2l" href="/terms-and-conditions">
                Terms &amp; Conditions
              </a>{" "}
              &amp;{" "}
              <a className="IBw2l" href="/privacy-policy">
                Privacy Policy
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default login;
