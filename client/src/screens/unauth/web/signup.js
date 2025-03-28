import React from "react";
import { Spin } from "antd";

const Signup = ({
  signupFormData,
  handleSingUpForm,
  handleSignUpSubmit,
  registerLoading,
  setIsLoginActive,
}) => {
  const { phone, name, email } = signupFormData;
  return (
    <div className="">
      <div>
        <div className="_3pYe-">
          <div className="_1Tg1D">Sign up</div>
          <div className="HXZeD"></div>
          <div className="_2r91t">
            or{" "}
            <span className="_3p4qh" onClick={() => setIsLoginActive(true)}>
              login to your account
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
        <form onSubmit={handleSignUpSubmit}>
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
                onChange={handleSingUpForm}
              />
              <div className="_2EeI1 _26LFr"></div>
              <label className="_1Cvlf _2tL9P " htmlFor="mobile">
                Phone number
              </label>
            </div>
            <div className="_3Um38 _3lG1r">
              <input
                className="_381fS"
                type="text"
                name="name"
                id="name"
                tabIndex="2"
                autoComplete="off"
                value={name}
                onChange={handleSingUpForm}
              />
              <div className="_2EeI1 _26LFr"></div>
              <label className="_1Cvlf _2tL9P" htmlFor="name">
                Name
              </label>
            </div>
            <div className="_3Um38 _3lG1r">
              <input
                className="_381fS"
                type="email"
                name="email"
                id="email"
                tabIndex="3"
                autoComplete="off"
                value={email}
                onChange={handleSingUpForm}
              />
              <div className="_2EeI1 _26LFr"></div>
              <label className="_1Cvlf _2tL9P" htmlFor="email">
                Email
              </label>
            </div>
          </div>
          <button className="_3GOZo">Have a referral code?</button>

          {/* <div className="_25qBi _2-hTu">
            <span className="a-ayg">
              <input type="submit" style={{ display: "none" }} />
              CONTINUE
            </span>
          </div> */}

          <div className="_25qBi _2-hTu">
            <button
              type="submit"
              className="a-ayg"
              disabled={registerLoading ? true : false}
            >
              {registerLoading ? <Spin size="small" /> : "CONTINUE"}
            </button>
          </div>

          <div className="_1FvHn">
            By creating an account, I accept the{" "}
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
  );
};

export default Signup;
