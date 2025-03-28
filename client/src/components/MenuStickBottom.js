import React from "react";
import { useSelector } from "react-redux";

const MenuStickBottom = ({ isShowMenu, setIsShowMenu }) => {
  // const { isShowBottomStickMenu } = useSelector(
  //   (state) => state.menuBottomSlice
  // );

  // if (!isShowBottomStickMenu) {
  //   return "";
  // }

  return (
    <div className="menuStickyBottom">
      <div className="fabButton">
        <button
          className="MenuFabButton"
          id="browse-menu-btn"
          data-testid="menu-fab-button"
          aria-label="Double tap to open Browse Menu modal."
          onClick={() => setIsShowMenu(true)}
        >
          <div className="FabButton_container">
            <span className="icon-menu" aria-hidden="true"></span>
            Browse Menu
          </div>
        </button>
      </div>
      <div className="viewCart d-none">
        <button
          data-testid="menu-view-cart-footer"
          aria-label="Cart details: 2 Items  present, total:  ₹388. Double tap to go to Cart Page."
          id="view-cart-btn"
        >
          <span className="styles_content" aria-hidden="true">
            <span className="styles_main">
              <span className="styles_mainTitle">2 Items | ₹388</span>
              <span className="styles_mainSubTitle"></span>
            </span>
            <span className="styles_viewCart">
              <span>View Cart</span>
              <img
                alt=""
                className="styles_viewCartIcon__2AoqF"
                height="14"
                loading="lazy"
                width="14"
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_28,h_28/ChatbotAssets/Checkout_Cart"
              />
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default MenuStickBottom;
