import React, { useEffect, useState } from "react";
import { AuthUnderline, ProductIcon } from "../../utils/svgs";
import LoginComponent from "./Login";
import TextChangeComponent from "../../components/unauth/TextChangeComponent";
import SignupComponent from "./Signup";

const Index = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className=" unauth_wrapper">
      {/*  */}
      <div className="content_container">
        {/* left */}
        <div className="left_section">
          <ProductIcon />
          <div className="title">PARTNER WITH SWIGGY!</div>
          <AuthUnderline />
          <TextChangeComponent />
        </div>
        {/* right */}
        <div className="css-175oi2r r-14lw9ot r-y47klf r-15d164r r-1n0xq6e r-zso239 r-156q2ks r-mon89y right_section">
          <div className="css-175oi2r r-14lw9ot r-y47klf r-1777fci r-k8qxaj r-1rdqkhd r-1hcxpru r-1knelpx right_section_container">
            {/*  */}
            {isSignIn ? (
              <>
                <div className="title_section">Get Started</div>
                {/*  */}
                <LoginComponent />
                {/*  */}
                <p className="condition_text">
                  Not a member,{" "}
                  <strong onClick={() => setIsSignIn(false)}>Sign Up</strong>
                </p>
              </>
            ) : (
              <>
                <div className="title_section">Register Today</div>
                {/*  */}
                <SignupComponent />
                {/*  */}
                <p className="condition_text">
                  Already a member,{" "}
                  <strong onClick={() => setIsSignIn(true)}>Sign In</strong>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      {/*  */}
    </div>
  );
};

export default Index;
