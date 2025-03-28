import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAddOrderMutation } from "../../../../apiSlices/cartApiSlice";
import { handleShowAlert } from "../../../../utils/commonHelper";
import { clearCart, clearItemFromcart } from "../../../../slices/cartSlice";

const CashOnDelivery = ({ setIsPaymentType }) => {
  //misc
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, selectedAddress } = useSelector((state) => state.cartReducer);
  const { restaurantDetails } = useSelector(
    (state) => state.restaurantDetailReducer
  );

  //queires n mutation
  const [
    addOrder,
    { isLoading, isSuccess, data: addOrderData, isError, error },
  ] = useAddOrderMutation();

  //func
  const handlePlaceOrder = async () => {
    const { address, doorNumber, landmark, location, type } = selectedAddress;
    const { items, finalCost } = cart;
    const data = {
      restaurantId: restaurantDetails?.data?._id, // Restaurant's ObjectId from MongoDB
      addressDetails: {
        address,
        doorNumber,
        landmark,
        location,
        type,
      },
      items,
      finalCost,
      status: "active", // or "pending" or "completed" based on the cart status
    };
    // console.log(data, " ddd");
    try {
      const result = await addOrder(data).unwrap(); // unwrap the result
      console.log(result, " resss");
      handleShowAlert(dispatch, "success", result?.message);
      dispatch(clearCart());
      navigate("/");
    } catch (err) {
      handleShowAlert(
        dispatch,
        "error",
        err?.message || "Something went wrong."
      );
    }
    // console.log({ cart, selectedAddress, restaurantDetails });
  };

  //async
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="web_payments_section">
      <div className="web_payments_container">
        <div className="styles_container_2U_BJoll styles_containerUx4_2R4FRGb5 web_payments_wrapper">
          {/*  */}
          <div className="web_payments_header">
            <div className="web_payments_header_container">
              <button
                className="web_payments_header_button"
                aria-label="Go Back"
                onClick={() => setIsPaymentType(null)}
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
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </button>
              <div className="Header_containerContent_2n-qQAeo">
                <div className="styles_header_2m84gsh0">
                  <h4
                    className="styles_headerTitleUx4_2H9faJAq"
                    onClick={() =>
                      console.log({ cart, selectedAddress, restaurantDetails })
                    }
                  >
                    Pay on delivery
                  </h4>
                  <div
                    className="styles_headerSubtitleUx4_2w0M1AuO styles_headerSubtitleGray_1WiZKLxM"
                    data-testid="header_subtitle"
                  >
                    {`${cart?.items?.length} ${
                      cart?.items?.length > 1 ? "items" : "item"
                    } • Total: ₹${cart?.finalCost}`}
                    {/* 1 item • Total: ₹466 */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="web_payments_content">
            <div className="web_payments_content_container">
              <div className="web_payments_content_wrapper">
                <div className="web_payments_content_item">
                  <div className="web_payments_content_item_description">
                    <div className="left_icon">
                      <img
                        crossorigin="anonymous"
                        className="styles-v4_iconImg_25Y5Kzks"
                        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_64/PaymentLogos/instruments/4x/Cod"
                        alt=""
                      />
                    </div>
                    <div className="title">
                      <div
                        aria-label="Cash Pay cash to delivery partner  or ask for QR code to pay via UPI."
                        aria-disabled="false"
                        tabindex="0"
                        role="button"
                        className="top_text"
                      >
                        <p>Pay on Delivery (Cash/UPI)</p>
                      </div>
                      <div className="bottom_text">
                        <span>
                          Pay cash to delivery partner or ask for QR code to pay
                          via UPI.
                        </span>
                      </div>
                    </div>
                    <div className="right_icon">
                      <div className="right_icon_container">
                        <span>
                          <svg
                            width="10"
                            height="9"
                            fill="none"
                            viewBox="0 0 10 9"
                          >
                            <path
                              stroke="#fff"
                              stroke-width="2"
                              d="M1 4.429L4.112 7 9 1"
                            ></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="payment_method_button">
                    <button onClick={() => handlePlaceOrder()}>
                      <div>Pay ₹ {cart?.finalCost} with Cash</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashOnDelivery;
