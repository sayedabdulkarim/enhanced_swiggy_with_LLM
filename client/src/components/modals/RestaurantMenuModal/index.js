import React, { useState, useRef, useEffect } from "react";
import { Button, Modal } from "antd";

const RestaurantMenuModal = ({
  isShowMenu,
  setIsShowMenu,
  restaurantCategories,
  onCategoryClick,
}) => {
  const showModal = () => {
    setIsShowMenu(true);
  };

  const handleOk = () => {
    setIsShowMenu(false);
  };

  const handleCancel = () => {
    setIsShowMenu(false);
  };

  return (
    <>
      <Modal
        title=""
        open={isShowMenu}
        onOk={handleOk}
        onCancel={handleCancel}
        wrapClassName="restaurant_menu_modal"
        centered
        closable={false}
        footer={null}
      >
        <div className="menu_Nav_content">
          {restaurantCategories?.map((category) => {
            const { categoryName, items } = category;
            return (
              <button
                key={categoryName}
                onClick={() => onCategoryClick(categoryName, handleCancel)}
                className="MenuNav_item"
                data-testid={`nav-cid-${categoryName}`}
                aria-label={`Category: ${categoryName}; ${
                  items?.length || 0
                } items available.`}
              >
                <span className="itemTitle" aria-hidden="true">
                  {categoryName}
                </span>
                <span className="itemCount" aria-hidden="true">
                  {items?.length}
                </span>
              </button>
            );
          })}
        </div>
      </Modal>
    </>
  );
};

export default RestaurantMenuModal;
