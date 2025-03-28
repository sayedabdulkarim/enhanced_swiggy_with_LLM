import React from "react";

const SwiggyOne = () => {
  return (
    <div className="swiggy_one_component">
      <div className="swiggy_one_container">
        {/*  */}
        <div className="swiggy_left_wrapper">
          <h2 className="text">Swiggy One</h2>
          <p className="desc">
            Get free delivery and extra discounts all across Swiggy.Your Swiggy
            One benefits can be availed only on the Swiggy App.
          </p>
          <div className="download_section">
            <a
              href="https://itunes.apple.com/in/app/id989540920?referrer=utm_source%3Dswiggy%26utm_medium%3Dhomepage"
              rel="nofollow noopener noreferrer"
              alt=""
              target="_blank"
            >
              <img
                alt=""
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200,h_65/icon-AppStore_lg30tv"
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=in.swiggy.android&amp;referrer=utm_source%3Dswiggy%26utm_medium%3Dheader"
              rel="nofollow noopener noreferrer"
              alt=""
              target="_blank"
            >
              <img
                alt=""
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200,h_65/icon-GooglePlay_1_zixjxl"
              />
            </a>
          </div>
        </div>
        {/*  */}
        <img
          className="right_image"
          alt=""
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_720,h_660/swiggy_one/my_account_super"
        />
      </div>
    </div>
  );
};

export default SwiggyOne;
