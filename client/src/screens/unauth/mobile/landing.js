import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import {
  Pagination,
  Navigation,
  HashNavigation,
  Autoplay,
} from "swiper/modules";
import { useTextCycle } from "../../../hooks/useTextCycle";

const Landing = ({ toggleLogin }) => {
  const texts = [
    "Order from top & favourite restaurants",
    "With a wide collection of cuisines",
    "Delivered quickly to your doorstep",
  ];
  const currentText = useTextCycle(texts, 3000); // 1000ms = 1 second
  return (
    <>
      <Swiper
        hashNavigation={{
          watchState: false,
        }}
        modules={[Pagination, Navigation, HashNavigation, Autoplay]}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500, // Delay between transitions in ms
          disableOnInteraction: false, // To continue autoplay after user interaction
          pauseOnMouseEnter: true,
        }}
        className="mySwiper portfolio__container"
        style={
          {
            // height: "310px",
          }
        }
      >
        <div class="portfolio__container container swiper-container">
          <div class="swiper-wrapper">
            <SwiperSlide
              // data-hash="slide1"
              className="portfolio__content grid"
            >
              <img
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_640/2xImageWideCollection_oksunf"
                alt=""
                className="portfolio__img"
              />
            </SwiperSlide>
            <SwiperSlide
              // data-hash="slide1"
              className="portfolio__content grid"
            >
              <img
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_640/2xImageFavouriteRestaurants_ezypea"
                alt=""
                className="Snapshot_Spectacle__img"
              />
            </SwiperSlide>
            <SwiperSlide
              // data-hash="slide1"
              className="portfolio__content grid"
            >
              <img
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_640/2xImageDeliveredQuickly_unovho"
                alt=""
                className="portfolio__img"
              />
            </SwiperSlide>
          </div>
        </div>
      </Swiper>

      {/*  */}
      <div className="mobile_below_section">
        <div className="text_animation_section">
          <h1 className="sZsUd changedText">{currentText}</h1>
        </div>

        <div className="HCM1R" aria-hidden="true">
          {" "}
          Ready to see top restaurants to order?
        </div>

        <button
          className="_1NevO _2UPEv _1OFIb"
          data-cy="primary-button"
          tabIndex="0"
        >
          SETUP YOUR LOCATION
        </button>

        <div className="_3yxii" role="button" tabIndex="0">
          <span>Have an account? </span>
          <span className="H8i3Q" onClick={() => toggleLogin(true)}>
            Login
          </span>
        </div>
      </div>
    </>
  );
};

export default Landing;
