import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addSelectedAddress } from "../../../../slices/cartSlice";

const SelectedAddressComponent = () => {
  // Dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //function
  const navigateToPayment = () => {
    navigate("/payments");
  };

  return (
    <div className="_3djal">
      <div>
        <div className="_1rwo5 _1Ak49 _34Whq">
          <div className="F8Sye">
            <div className="_2YrH-">Delivery address</div>
            <div className="C2lmo _3za0v">
              <div className="_2C3aj _1eJQw">
                <span className="_1ZSwS icon-tickRound"></span>
              </div>
            </div>
          </div>
          <div className="_2zPJt">
            <div
              className="_1IPhI"
              onClick={() => dispatch(addSelectedAddress(null))}
            >
              Change
            </div>
            <div className="_2kejs">Other</div>
            <div className="_1QRRt">
              Looks studio, # 10/5, 1st main, Koramangala, KHB Colony, 5th
              Block, Koramangala, Bengaluru, Karnataka 560034, India
            </div>
            <div className="_1__JV">77 MINS</div>
          </div>
          <div className="_250uQ"></div>
          <div className="_2b4pY">
            <span className="_1q8J4 icon-marker-checkout"></span>
          </div>
        </div>
        <div>
          <div className="_1rwo5">
            <div className="F8Sye">
              <div className="_2YrH-">Choose payment method</div>
            </div>
            <button className="_3PNwl" onClick={() => navigateToPayment()}>
              Proceed to Pay
            </button>
            <div className="_2b4pY">
              <span className="_1q8J4 icon-wallet-checkout"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedAddressComponent;
