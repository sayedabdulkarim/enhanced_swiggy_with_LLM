import React from "react";

const Login = ({
  toggleLogin,
  loginFormData,
  handleLogInForm,
  isOtp,
  handleLogInContinue,
  handleVerifyOtp,
}) => {
  const { phone, otp } = loginFormData;
  return (
    <div>
      <div className="_3EFMg">
        <img
          alt=""
          className="_2yQPs _1rfuP"
          height="134"
          width="75"
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/create_account_graphics_2x_brdvrk"
        />
        <button
          className="_2QN4q _1im59"
          data-cy="back-button"
          aria-label="Double tap to go back"
          onClick={() => toggleLogin(false)}
        >
          <svg className="uHGrw" viewBox="0 0 32 32" height="18" width="18">
            <path d="M3.333 14.984l28.667-0v2.097l-0.16 0.006h-28.506l-0.16-0.16v-1.782l0.16-0.16zM1.114 14.986l10.079-10.079 0.121-0.108 1.465 1.467-0.101 0.127-10.079 10.079h-0.226l-1.26-1.26v-0.226zM12.679 25.676l0.108 0.117-1.468 1.484-0.126-0.115-10.079-10.079v-0.226l1.26-1.26h0.226l10.079 10.079zM3.268 12.87l0.272 0.116-0.022 6.125-0.272 0.114-3.245-3.18 0.111-0.112 3.157-3.062z"></path>
          </svg>
        </button>
        <div className="_1IbBN">
          <h1 className="_2clOW" data-cy="header-title">
            LOGIN
          </h1>
          <div
            role="heading"
            aria-level="3"
            className="DLItg _2_k47"
            data-cy="header-description"
          >
            Enter your phone number to continue
          </div>
        </div>
      </div>
      <div className="cDWSj">
        <form
          autoComplete="off"
          onSubmit={!isOtp ? handleLogInContinue : handleVerifyOtp}
        >
          <div className="npnSS">
            <div className="_11Jfu" aria-hidden="true">
              <label
                className="_21cv8"
                htmlFor="mobile"
                data-cy="input-label-mobile"
                aria-hidden="true"
              >
                PHONE NUMBER
              </label>
              <label>
                <input
                  className="_1ZK9h _1g81h"
                  type="tel"
                  name="phone"
                  id="mobile"
                  autoComplete="on"
                  tabIndex="1"
                  data-cy="input-phone-number"
                  data-testid="input-field-mobile"
                  value={phone}
                  onChange={handleLogInForm}
                />
              </label>
              <span className="Qe5_f"></span>
            </div>
            <span className="_2YNHY" aria-hidden="true">
              +91 -{" "}
            </span>
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

          <div className="_3JGzG _3nBzT">
            <button
              className="_1vTVI _2UPEv"
              data-cy="primary-button"
              aria-label="Click here to send the OTP"
            >
              CONTINUE
            </button>
          </div>
          <div className="_1CZpY">
            By clicking, I accept the{" "}
            <a href="/terms-and-conditions" className="_1yKIM">
              Terms &amp; Conditions
            </a>{" "}
            &amp;{" "}
            <a href="/privacy-policy" className="_1yKIM">
              Privacy Policy
            </a>
          </div>
          <input type="button" hidden="" />
        </form>
      </div>
    </div>
  );
};

export default Login;
