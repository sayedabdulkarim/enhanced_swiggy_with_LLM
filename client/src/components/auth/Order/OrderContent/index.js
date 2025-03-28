import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//cmp
import OrdersComponent from "./OrdersComponent";
import SwiggyOne from "./SwiggyOneComponent";
import FavoritesComponent from "./FavoritesComponent";
import PaymentComponent from "./PaymentComponent";
import AddressComponent from "./AddressComponent";
import SettingComponent from "./SettingComponent";

const Index = ({ savedAddress }) => {
  //misc
  const navigate = useNavigate();
  //func
  const handleNavigateToFavorite = (route) => {
    navigate(`${route}`);
  };

  //state
  const [activeSection, setActiveSection] = useState("order");

  let showComponent;
  switch (activeSection) {
    case "order":
      showComponent = <OrdersComponent />;
      break;
    case "swiggyone":
      showComponent = <SwiggyOne />;
      break;
    // case "favorite":
    //   showComponent = <FavoritesComponent />;
    //   break;
    case "payment":
      showComponent = <PaymentComponent />;
      break;
    case "address":
      showComponent = <AddressComponent savedAddress={savedAddress} />;
      break;
    case "setting":
      showComponent = <SettingComponent />;
      break;
    default:
      showComponent = <OrdersComponent />;
  }

  const handleActiveComponent = (type) => {
    setActiveSection(type);
  };

  return (
    <div className="order_container_content">
      <div className="order_container_wrapper">
        <div className="order_container">
          <div className="left_section">
            <ul>
              <li
                className={`item ${
                  activeSection === "order" ? "isActive" : ""
                }`}
                onClick={() => handleActiveComponent("order")}
              >
                <span className="icon"></span>
                <span className="title">Orders</span>
              </li>
              <li
                className={`item ${
                  activeSection === "swiggyone" ? "isActive" : ""
                }`}
                onClick={() => handleActiveComponent("swiggyone")}
              >
                <span className="icon"></span>
                <span className="title">Swiggy One</span>
              </li>
              <li
                className={`item ${
                  activeSection === "favorite" ? "isActive" : ""
                }`}
                onClick={() => handleNavigateToFavorite("/favorites")}
              >
                <span className="icon"></span>
                <span className="title">Favourites</span>
              </li>
              {/* <li
                className={`item ${
                  activeSection === "payment" ? "isActive" : ""
                }`}
                onClick={() => handleActiveComponent("payment")}
              >
                <span className="icon"></span>
                <span className="title">Payments</span>
              </li> */}
              <li
                className={`item ${
                  activeSection === "address" ? "isActive" : ""
                }`}
                onClick={() => handleActiveComponent("address")}
              >
                <span className="icon"></span>
                <span className="title">Addresses</span>
              </li>
              <li
                className={`item ${
                  activeSection === "setting" ? "isActive" : ""
                }`}
                onClick={() => handleActiveComponent("setting")}
              >
                <span className="icon"></span>
                <span className="title">Settings</span>
              </li>
            </ul>
          </div>
          {/*  */}
          <div className="right_section">{showComponent}</div>
        </div>
      </div>
    </div>
  );
};

export default Index;
