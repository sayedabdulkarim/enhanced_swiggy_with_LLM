import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Payments = ({ setIsPaymentType }) => {
  const navigate = useNavigate("/");
  const { cart, selectedAddress } = useSelector((state) => state.cartReducer);
  const { restaurantDetails } = useSelector(
    (state) => state.restaurantDetailReducer
  );

  useEffect(() => {
    if (!selectedAddress && !cart?.items?.length) {
      navigate("/");
    }
  }, [selectedAddress, cart, navigate]);

  return (
    <div className="payment_wrapper">
      <div className="payment_container">
        <div className="payment_sections">
          {/*  */}
          <div className="payment_header">
            <div className="header_container">
              <button
                className=""
                aria-label="Go Back"
                onClick={() => navigate("/checkout")}
              >
                <svg
                  width="20"
                  height="18"
                  viewBox="0 0 20 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.9"
                    d="M6.81875 14.5714L1 8.23808M1 8.23808L6.81875 1.90475M1 8.23808L19 8.23808"
                    stroke="var(--arrow-color-env, #66686E)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
              <div className="header_content">
                <div className="styles_header">
                  <h4
                    className="header_title"
                    onClick={() =>
                      console.log({ cart, selectedAddress, restaurantDetails })
                    }
                  >
                    Payment Options
                  </h4>
                  <div className="header_subtitle">
                    {/* 1 item • Total: ₹472 */}

                    {`${cart?.items?.length} ${
                      cart?.items?.length > 1 ? "items" : "item"
                    } • Total: ₹${cart?.finalCost}`}

                    <span className="header_subtitle_offer">
                      {" "}
                      • Savings of ₹2*
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="styles_content_3vmBOQV0 styles_contentUx4_2ASL4wVh payment_content">
            {/*  */}
            <div className="DeliveryAddressView_wrapper_1zazTnRd delivery_address_view_wrapper">
              <div className="DeliveryAddressView_innerWrapper_3H4RKzRr delivery_address_inner_wrapper">
                <div className="DeliveryAddressView_icons_3L9XU_AK delivery_address_view_icon">
                  <span data-testid="dav_outlet_icon">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="6"
                        cy="6"
                        r="4.5"
                        fill="white"
                        stroke="#6541E4"
                        strokeWidth="3"
                      ></circle>
                    </svg>
                  </span>
                  <svg
                    width="4"
                    height="15"
                    viewBox="0 0 4 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 0V27" stroke="#6541E4" strokeWidth="5"></path>
                  </svg>
                  <span data-testid="dav_addr_icon">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="6"
                        cy="6"
                        r="4.5"
                        fill="white"
                        stroke="#6541E4"
                        strokeWidth="3"
                      ></circle>
                    </svg>
                  </span>
                </div>
                <div
                  className="DeliveryAddressView_details_3OknIm69 delivery_view_details"
                  aria-hidden="true"
                >
                  <div className="DeliveryAddressView_pickupDetails_1rjxaQZT pickup_details">
                    <div
                      className="DeliveryAddressView_restaurantName_2QejD4Cm outlet_name"
                      data-testid="dav_outlet_name"
                    >
                      {/* Chai Point */}
                      {restaurantDetails?.data?.name}
                    </div>
                    <span className="separator">|</span>
                    {/* <p className="pickup_Subtext">Delivery in: 92 mins</p> */}
                    <p className="pickup_Subtext">
                      Delivery in: {restaurantDetails?.data?.sla?.slaString}
                    </p>
                  </div>
                  <div className="DeliveryAddressView_deliveryDetails_2yW-ZRVX to_deliver_details">
                    <div
                      className="address_annotation"
                      data-testid="dav_addr_tag"
                    >
                      {/* Other */}
                      {selectedAddress?.type}
                    </div>
                    <span className="separator">|</span>
                    <div
                      className="delivery_address_text"
                      data-testid="dav_addr_dtls"
                    >
                      {selectedAddress?.address}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="payment_options_wrapper">
              {/*  */}
              <div
                className="offersStrip_banner"
                data-testid="offer_strip_container"
              >
                <div className="offersStrip_wrapper">
                  <div className="offersStrip_carousel">
                    <div className="offersStrip_carousel_static_item">
                      <div className="offersStrip_carousel_static_icon">
                        <img
                          crossOrigin="anonymous"
                          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/v1685605082/Ratnesh_Badges/Icon_for_offer.png"
                          className="OffersStrip_carouselImg_38qKA6Z3"
                          data-testid="offer_strip_static_image"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="offersStrip_bannerContentContainer"
                  data-testid="offer_strip_text"
                >
                  Save <b>upto ₹94</b> more with payment offers
                </div>
                <div
                  className="offersStrip_ArrowIconWrapper"
                  aria-hidden="true"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8 14.54L12.105 10.4L8 6.26L8.9843 5L14 10.4L8.9843 15.8L8 14.54Z"
                      fill="#1BA672"
                    ></path>
                  </svg>
                </div>
              </div>
              {/*  */}
              <div className="payment_group_container">
                <div className="payment_group_header">
                  <h2 className="payment_group_upi_title">UPI</h2>
                </div>
                <div className="payment_method_section">
                  <div className="payment_method_wrapper">
                    <div className="payment_method_container">
                      <div className="card_icon_container" aria-hidden="true">
                        <div className="newUpi_icon"></div>
                      </div>
                      <div className="payment_new_upi">
                        <div className="payment_new_upi_title">
                          <h4>Add New UPI ID</h4>
                        </div>
                        <div className="payment_new_upi_subtitle">
                          <h5>You need to have a registered UPI ID</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*  */}

              <div className="payment_group_container">
                <div className="payment_group_header">
                  <h2 className="payment_group_upi_title">
                    Credit &amp; Debit Cards
                  </h2>
                </div>
                <div className="payment_method_section">
                  <div className="payment_method_wrapper">
                    <div className="payment_method_container">
                      <div className="card_icon_container" aria-hidden="true">
                        <div className="newUpi_icon"></div>
                      </div>
                      <div className="payment_new_upi">
                        <div className="payment_new_upi_title">
                          <h4>Add New Card</h4>
                        </div>
                        <div className="payment_new_upi_subtitle">
                          <h5>Save and Pay via Cards</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*  */}
              <div className="more_payment_container">
                <div className="more_payment_header">
                  <h2 className="more_payment_header_title">
                    More Payment Options
                  </h2>
                </div>
                <div className="more_payment_list_wrapper">
                  {/*  */}
                  <div className="more_payment_list_item">
                    <div className="item isDisabled">
                      <div className="item_icon">
                        <img
                          crossOrigin="anonymous"
                          className=""
                          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_64,e_trim/PaymentLogos/instruments/4x/Wallet"
                          width="24"
                          alt=""
                        />
                      </div>
                      <div className="payment_option_container">
                        <div className="payment_option_container_header">
                          Wallets
                        </div>
                        <div className="payment_option_container_subText">
                          Paytm, PhonePe, Amazon Pay &amp; more
                        </div>
                      </div>
                      <div
                        className="payment_option_container_icon"
                        aria-hidden="true"
                      >
                        <svg
                          width="8"
                          height="12"
                          viewBox="0 0 8 12"
                          fill="none"
                          className="PaymentOption-v4_containerArrowIcon_13glsTwt"
                        >
                          <path
                            d="M1 1.00024L6 6.00024L1 11.0002"
                            stroke="#BABBC0"
                            strokeWidth="1.5"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  {/*  */}
                  {/*  */}
                  <div className="more_payment_list_item">
                    <div className="item isDisabled">
                      <div className="item_icon">
                        <img
                          crossOrigin="anonymous"
                          className=""
                          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_64,e_trim/PaymentLogos/instruments/4x/Net_banking"
                          width="24"
                          alt=""
                        />
                      </div>
                      <div className="payment_option_container">
                        <div className="payment_option_container_header">
                          Net Banking
                        </div>
                        <div className="payment_option_container_subText">
                          Select from a list of banks
                        </div>
                      </div>
                      <div
                        className="payment_option_container_icon"
                        aria-hidden="true"
                      >
                        <svg
                          width="8"
                          height="12"
                          viewBox="0 0 8 12"
                          fill="none"
                          className="PaymentOption-v4_containerArrowIcon_13glsTwt"
                        >
                          <path
                            d="M1 1.00024L6 6.00024L1 11.0002"
                            stroke="#BABBC0"
                            strokeWidth="1.5"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  {/*  */}
                  {/*  */}
                  <div
                    className="more_payment_list_item"
                    style={{ cursor: "pointer" }}
                    onClick={() => setIsPaymentType("cash_on_delivery")}
                  >
                    <div className="item">
                      <div className="item_icon">
                        <img
                          crossOrigin="anonymous"
                          className=""
                          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_64,e_trim/PaymentLogos/instruments/4x/Cash"
                          width="24"
                          alt=""
                        />
                      </div>
                      <div className="payment_option_container">
                        <div className="payment_option_container_header">
                          Pay on Delivery
                        </div>
                        <div className="payment_option_container_subText">
                          Pay in cash or pay online
                        </div>
                      </div>
                      <div
                        className="payment_option_container_icon"
                        aria-hidden="true"
                      >
                        <svg
                          width="8"
                          height="12"
                          viewBox="0 0 8 12"
                          fill="none"
                          className="PaymentOption-v4_containerArrowIcon_13glsTwt"
                        >
                          <path
                            d="M1 1.00024L6 6.00024L1 11.0002"
                            stroke="#BABBC0"
                            strokeWidth="1.5"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  {/*  */}
                  {/*  */}
                  <div className="more_payment_list_item">
                    <div className="item isDisabled">
                      <div className="item_icon">
                        <img
                          crossOrigin="anonymous"
                          className=""
                          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_64,e_trim/PaymentLogos/instruments/4x/food_card"
                          width="24"
                          alt=""
                        />
                      </div>
                      <div className="payment_option_container">
                        <div className="payment_option_container_header">
                          Pluxee/Sodexo
                        </div>
                        <div className="payment_option_container_subText">
                          Not applicable as your cart has a non-food item
                        </div>
                      </div>
                      <div
                        className="payment_option_container_icon"
                        aria-hidden="true"
                      >
                        <svg
                          width="8"
                          height="12"
                          viewBox="0 0 8 12"
                          fill="none"
                          className="PaymentOption-v4_containerArrowIcon_13glsTwt"
                        >
                          <path
                            d="M1 1.00024L6 6.00024L1 11.0002"
                            stroke="#BABBC0"
                            strokeWidth="1.5"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  {/*  */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
