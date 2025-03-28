const TopRestaurantOfferBadge = ({ isShow }) => {
  return (
    <div
      className="sc-fifgRP kiywRV"
      style={{ visibility: isShow ? "hidden" : "none" }}
    >
      <svg
        width="123"
        height="37"
        viewBox="0 0 123 37"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 8C0 4.22876 0 2.34315 1.17157 1.17157C2.34315 0 4.22876 0 8 0H107C114.542 0 118.314 0 120.657 2.34315C123 4.68629 123 8.45753 123 16V21C123 28.5425 123 32.3137 120.657 34.6569C118.314 37 114.542 37 107 37H8C4.22876 37 2.34315 37 1.17157 35.8284C0 34.6569 0 32.7712 0 29V8Z"
          fill="url(#paint0_linear_1507_44472)"
        ></path>
        <defs>
          <linearGradient
            id="paint0_linear_1507_44472"
            x1="120.437"
            y1="18.5"
            x2="33.0876"
            y2="-20.8344"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ED456D"></stop>
            <stop offset="1" stopColor="#F36F45"></stop>
          </linearGradient>
          <linearGradient
            id="paint1_linear_1507_44472"
            x1="7.01672"
            y1="13.9211"
            x2="6.15587"
            y2="20.1331"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0"></stop>
            <stop offset="1" stopColor="white"></stop>
          </linearGradient>
        </defs>
      </svg>
      <div className="sc-bDumWk liwPIr">
        <svg
          width="33"
          height="12"
          viewBox="0 0 33 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.67254 6.47237C3.67254 5.58851 4.1007 4.87334 4.87278 4.65725L3.41426 3.30916L4.69322 1.44385C1.72094 1.74219 0 3.95741 0 6.47237C0 8.72245 1.37427 10.7495 3.78994 11.3685L4.78576 8.28192C4.06755 8.03795 3.67254 7.3395 3.67254 6.47237Z"
            fill="url(#paint0_linear_18993_67592)"
          ></path>
          <path
            d="M7.1045 6.47468C7.1045 7.5565 6.48988 8.37763 5.37803 8.37763C4.78965 8.37763 4.34491 8.13366 4.05625 7.74192L0.430664 8.55886C1.18479 10.2945 2.90435 11.5632 5.37941 11.5632C8.79368 11.5632 10.7784 9.17784 10.7784 6.47329C10.7784 3.76873 8.79368 1.40433 5.37941 1.40433C5.33532 1.40433 5.29231 1.40706 5.24937 1.40979C5.2237 1.41142 5.19807 1.41305 5.17224 1.41409L5.10318 0.430176L2.87414 3.31651L5.55206 5.79051V4.60101C5.56305 4.60239 5.57439 4.60275 5.58556 4.60309C5.59684 4.60344 5.60794 4.60379 5.61836 4.60519C6.57827 4.71532 7.1045 5.49184 7.1045 6.47468Z"
            fill="white"
          ></path>
          <path
            d="M17.9923 11.3233V5.97271C17.9923 4.97036 17.4564 4.58977 16.6028 4.58977C15.7893 4.58977 15.3722 5.01078 15.0739 5.35094V11.3219H11.5008V1.64542H15.0739V2.74676C15.6291 2.10548 16.6815 1.40424 18.3693 1.40424C20.593 1.40424 21.5654 2.76628 21.5654 4.45035V11.3233H17.9923Z"
            fill="white"
          ></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22.2655 6.47456C22.2655 3.66962 24.3898 1.4056 27.4864 1.4056C30.3053 1.4056 32.4696 3.44935 32.4696 6.85514V7.59681H25.9588C26.1577 8.21858 26.8524 8.81943 28.0236 8.81943C28.5595 8.81943 29.7501 8.55874 30.2266 8.13772L31.6962 10.3613C30.7432 11.1824 29.036 11.563 27.6065 11.563C24.608 11.563 22.2655 9.66008 22.2655 6.47456ZM27.4864 4.14919C26.3952 4.14919 26.0375 4.86994 25.9187 5.31187H29.0747C28.9753 4.89086 28.6383 4.14919 27.4864 4.14919Z"
            fill="white"
          ></path>
          <defs>
            <linearGradient
              id="paint0_linear_18993_67592"
              x1="3.15987"
              y1="1.3627"
              x2="2.31698"
              y2="7.65772"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0"></stop>
              <stop offset="1" stopColor="white"></stop>
            </linearGradient>
          </defs>
        </svg>
        <div className="sc-dkmUuB jLNRCt">
          <div className="sc-aXZVg gJSirL">Free delivery</div>
        </div>
      </div>
    </div>
  );
};

export default TopRestaurantOfferBadge;
