import React from "react";
import { useNavigate } from "react-router-dom";
import { arrayToString } from "../../../utils/commonHelper";
import {
  FavoriteRestaurantBadgeBackground,
  FavoriteRestaurantBadgeContent,
  RestaurantsRatingStar,
} from "../../../utils/svgs";

const Favorites = ({ favoriteData }) => {
  //misc
  const navigate = useNavigate();
  //func
  const handleNavigation = (name, id) => {
    navigate(`/restaurant/${name}/${id}`);
  };

  return (
    <>
      {/*  */}
      <div className="title_container">
        <div className=" text">Favorite Restaurants</div>
        <div className=" divider"></div>
      </div>
      {/*  */}
      <div className=" items_container">
        <main className="items_wrapper">
          {/*  */}
          {favoriteData?.map((o) => {
            const {
              _id,
              areaName,
              avgRating,
              badges,
              sla,
              name,
              cuisines,
              cloudinaryImageId,
            } = o;
            return (
              <div
                className=" item"
                key={_id}
                onClick={() => handleNavigation(name, _id)}
              >
                <div className="item_wrapper">
                  <div className=" item_card">
                    <div className=" item_card_wrapper">
                      {/*  */}
                      <div className=" image_wrapper">
                        <div className=" image_container">
                          {/*  */}
                          <div width="100%" height="100%" className=" bg_img">
                            <img
                              className=""
                              //   src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/2b4f62d606d1b2bfba9ba9e5386fabb7"
                              // src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
                              src={`${cloudinaryImageId}`}
                              alt="Pizza Hut"
                            />
                            <div className="bg_overlay"></div>
                          </div>
                          {/*  */}
                          <div
                            className=" bg_strip"
                            style={{ display: badges ? "block" : "none" }}
                          >
                            <FavoriteRestaurantBadgeBackground />
                            <div className="bg_strip_over">
                              <FavoriteRestaurantBadgeContent />
                              <div className=" bg_strip_over_text">
                                <div className=" text">Free delivery</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*  */}
                      <div className="description_wrapper">
                        {/*  */}
                        <div className=" title">{name}</div>
                        {/*  */}
                        <div className=" subtext_container">
                          <div className="svg_container">
                            <RestaurantsRatingStar />
                          </div>
                          {/*  */}
                          <div className=" time_container">
                            <span className=" time">
                              {avgRating} • {sla?.deliveryTime} mins
                            </span>
                          </div>
                        </div>
                        <div className="descriptions_container">
                          <div className="ellipsis">
                            {arrayToString(cuisines)}
                          </div>
                          <div className="">{areaName}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
            );
          })}
        </main>
      </div>
      {/*  */}
    </>
  );
};

export default Favorites;
