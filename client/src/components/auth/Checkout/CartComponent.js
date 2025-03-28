import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTocart,
  removeFromcart,
  updateFeesAndTotal,
} from "../../../slices/cartSlice";

const CartComponent = () => {
  // Dispatch
  const dispatch = useDispatch();
  // Redux state
  const { cart } = useSelector((state) => state.cartReducer);
  const { restaurantDetails } = useSelector(
    (state) => state.restaurantDetailReducer
  );

  useEffect(() => {
    if (cart.items.length > 0) {
      const deliveryFee = 50; // Example delivery fee
      const platformFee = 20; // Example platform fee
      const gst = 30; // Example GST

      dispatch(
        updateFeesAndTotal({
          deliveryFee,
          platformFee,
          gst,
        })
      );
    }
  }, [cart.items, dispatch]);

  if (!restaurantDetails) return null;

  const { name, areaName, cloudinaryImageId } = restaurantDetails?.data;
  const { items, deliveryFee, gst, platformFee, totalCost, finalCost } = cart;

  return (
    <div className="_2sMsA">
      <div className="_1LDW5">
        <button className="_1mJeT">
          <span className="_1dcmE">
            <img
              className=""
              src={
                cloudinaryImageId.startsWith("data:image")
                  ? cloudinaryImageId
                  : `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${cloudinaryImageId}`
              }
              alt="img renderer"
              height="50"
              width="50"
            />
          </span>
          <span className="u1PgV">
            <div className="V7Usk">{name}</div>
            <div className="_2ofXa">{areaName}</div>
          </span>
        </button>
        {/* Other nested components can go here */}
        <div className="_1A195">
          <div className="_1t-Al">
            <div className="_3YMqW"></div>
            <div className="_2ObNr _2XVjJ _1S7oI">
              <div>
                <div className="_2zsON"></div>
                {/* loop */}
                {items?.map((item) => {
                  const { _id, name, price, count } = item;
                  return (
                    <div className="_2pdCL" key={_id}>
                      <div className="_2bXOy">
                        <div className="_3SG03">
                          <i
                            className="styles_icon__m6Ujp _2MJB6 icon-Veg styles_iconVeg__shLxJ"
                            role="presentation"
                            aria-hidden="true"
                          ></i>
                          <div
                            className="_33KRy"
                            onClick={() =>
                              console.log(
                                { cart, restaurantDetails },
                                " cartcart"
                              )
                            }
                          >
                            {name}
                            <button className="_23dMP">Customize</button>
                          </div>
                        </div>
                        <div className="_2bWmk">
                          <div className="_1yTZI">
                            <div className="_3L1X9 _29ugw">
                              <div className="_1RPOp _36fT9 _4aKW6">ADD</div>
                              {/* <div className="_3Hy2E hDN3x _4aKW6">+</div> */}
                              <div
                                className="_1ds9T"
                                onClick={() => dispatch(addTocart(item))}
                                // onClick={() => console.log("addd")}
                              >
                                +
                              </div>
                              <div
                                className="_29Y5Z"
                                // onClick={() => console.log("minusss")}
                                onClick={() =>
                                  dispatch(removeFromcart({ _id }))
                                }
                              ></div>
                              <div className="_2zAXs">{count}</div>
                            </div>
                            <div className="_1mx0r">
                              <span className="_2W2U4">{price * count}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {/*  */}
                <div className="_2JQh7">
                  <textarea className="aeGJF" maxLength="140"></textarea>
                  <div className="_2_0V3">
                    Any suggestions? We will pass it on...
                  </div>
                  <svg className="_3iLcN" viewBox="0 0 32 32">
                    <path d="M7.031 14c3.866 0 7 3.134 7 7s-3.134 7-7 7-7-3.134-7-7l-0.031-1c0-7.732 6.268-14 14-14v4c-2.671 0-5.182 1.040-7.071 2.929-0.364 0.364-0.695 0.751-0.995 1.157 0.357-0.056 0.724-0.086 1.097-0.086zM25.031 14c3.866 0 7 3.134 7 7s-3.134 7-7 7-7-3.134-7-7l-0.031-1c0-7.732 6.268-14 14-14v4c-2.671 0-5.182 1.040-7.071 2.929-0.364 0.364-0.695 0.751-0.995 1.157 0.358-0.056 0.724-0.086 1.097-0.086z"></path>
                  </svg>
                </div>
                {/*  */}
                {/*  */}
                <div className="DBHDW">
                  <div className="_3yJGp">
                    <div className="_3wdKC">
                      <label className="Checkbox_checkboxLabel__3HKUG">
                        <input
                          type="checkbox"
                          className="Checkbox_checkboxInput__16SSg"
                          name="CUTLERY_INSTRUCTION_CHK_BOX"
                          value="CUTLERY_INSTRUCTION_CHK_BOX"
                        />
                        <svg
                          className="Checkbox_checkboxTick__TZzsL"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                        </svg>
                      </label>
                    </div>
                    <div aria-hidden="true">
                      <div className="_2gBWe">
                        Opt in for No-contact Delivery
                      </div>
                      <div className="_2Ohbp">
                        Unwell, or avoiding contact? Please select no-contact
                        delivery. Partner will safely place the order outside
                        your door (not for COD)
                      </div>
                    </div>
                  </div>
                </div>
                {/*  */}
                {/*  */}
                <div className="_3PZFF">
                  <div
                    role="button"
                    aria-label="Apply Coupon"
                    className="_2aJip"
                  >
                    <i className="icon-offers-coupon _2W5PY"></i> Apply Coupon
                  </div>
                  <div className="_3e0Qi">Bill Details</div>
                  <div className="_3rlIu">
                    <div className="_2VV4a">
                      <span>Item Total</span>
                    </div>
                    <div className="_1I8bA">
                      <span className="">
                        <span></span>
                        <span className="ZH2UW">{totalCost}</span>
                      </span>
                    </div>
                  </div>
                  <div className="_3rlIu">
                    <div className="_2VV4a">
                      <div>
                        Delivery Fee | 2.0 kms
                        <div className="_3sNvC">
                          <span className="icon-info"></span>
                        </div>
                      </div>
                    </div>
                    <div className="_1I8bA">
                      <span className="">
                        <span></span>
                        <span className="ZH2UW">{deliveryFee}</span>
                      </span>
                    </div>
                  </div>
                  <div className="_1Accg"></div>
                  <div className="_3rlIu">
                    <div className="_2VV4a">
                      <span>Delivery Tip</span>
                    </div>
                    <div className="_1I8bA">
                      <span className="">
                        <span></span>
                        <span className="">Add tip</span>
                      </span>
                    </div>
                  </div>
                  <div className="_3rlIu">
                    <div className="_2VV4a">
                      <div>
                        Platform fee
                        <div className="_3sNvC">
                          <span className="icon-info"></span>
                        </div>
                      </div>
                    </div>
                    <div className="_1I8bA">
                      <span className="_1A4pB _3Lk3Q ZH2UW">
                        {platformFee + 10}
                      </span>
                      <span className="">
                        <span></span>
                        <span className="">{platformFee}</span>
                      </span>
                    </div>
                  </div>
                  <div className="_3rlIu">
                    <div className="_2VV4a">
                      <div>
                        GST and Restaurant Charges
                        <div className="_3sNvC">
                          <span className="icon-info"></span>
                        </div>
                      </div>
                    </div>
                    <div className="_1I8bA">
                      <span className="">
                        <span></span>
                        <span className="ZH2UW">{gst}</span>
                      </span>
                    </div>
                  </div>
                </div>
                {/*  */}
                {/*  */}
                <div className="_3DPdG"></div>
                {/*  */}
                <div className="ZBf6d">
                  <div>TO PAY</div>
                  <div className="_3ZAW1">{finalCost}</div>
                </div>
                {/*  */}
                {/* <div className="_3QkCH">Savings of ₹2</div> */}
                {/*  */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* More components or divs */}
    </div>
  );
};

export default CartComponent;
