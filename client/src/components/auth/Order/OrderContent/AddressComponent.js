import React from "react";

const Address = ({ savedAddress }) => {
  return (
    <div className=" address_component">
      <div className="address_component_container">
        <div className=" title">Manage Addresses</div>

        <div className=" address_container_items">
          {savedAddress?.addresses?.map((item) => {
            const { _id, address, type } = item;
            return (
              <div
                key={_id}
                className=" item"
                onClick={() => console.log(item, " iiiiiiiii")}
              >
                <div className=" item_icon">
                  <span
                    className={`${type === "Home" ? "icon-home" : "icon-work"}`}
                  ></span>
                </div>
                <div className="item_desc">
                  <div className=" type">{type}</div>
                  <div className=" address">{address}</div>
                  <div className=" btn_container">
                    <span>EDIT</span>
                    <span>DELETE</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Address;
