import { forwardRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//dispatcher
import { addTocart, removeFromcart } from "../slices/cartSlice";
import { getCountByProductIdFromCart } from "../utils/commonHelper";
// Single Item Component
const MenuItem = ({ item }) => {
  const { _id, name, description, price, imageId } = item;
  // Dispatch
  const dispatch = useDispatch();
  // Redux state
  const { cart } = useSelector((state) => state.cartReducer);
  const itemCount = useSelector((state) =>
    getCountByProductIdFromCart(state.cartReducer.cart.items, _id)
  );

  console.log({ cart, itemCount }, " itemCount");
  return (
    <>
      <div className="item_description">
        {/* det_container */}
        <div className="detailsContainer">
          <div aria-hidden="true">
            <i
              className="icon-NonVeg"
              role="presentation"
              aria-hidden="true"
            ></i>
            <span className="bestseller_icon">
              <span className="styles_ribbonStar__1cZQq icon-star"></span>{" "}
              Bestseller
            </span>
          </div>
          <div className="itemName" aria-hidden="true">
            <h3>{name}</h3>
          </div>

          <div className="itemPortionContainer" aria-hidden="true">
            <span className="itemPrice" aria-hidden="true">
              <span className="priceStrike">{price}</span>
              <span className="rupee">{price}</span>
            </span>
          </div>
          <div className="itemDesc" aria-hidden="true">
            {description}
          </div>
        </div>
        {/* img_container */}
        <div className="item_image">
          <div aria-hidden="true">
            <button
              className="styles_itemImage__3CsDL"
              aria-label="See more information about Butter Chicken Frankie Roll"
            >
              <img
                alt="Butter Chicken Frankie Roll"
                className="styles_itemImage__3CsDL"
                loading="lazy"
                width="256"
                src={
                  imageId.startsWith("data:image")
                    ? imageId
                    : `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${imageId}`
                }
              />
            </button>
          </div>
          <div className="addButton">
            <div className="main_buttonInner">
              <div className="text"> {itemCount === 0 ? "Add" : itemCount}</div>
              <div
                className="plus _1ds9T _2Thnf"
                onClick={() => dispatch(addTocart(item))}
              >
                +
              </div>
              {itemCount ? (
                <div
                  className="minus _29Y5Z _2od4M"
                  style={{ opacity: "initial" }}
                  onClick={() => dispatch(removeFromcart({ _id }))}
                ></div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="divider"></div>
    </>
  );
};

// MenuCategoryAccordion now accepts a ref prop
const MenuCategoryAccordion = forwardRef(({ category }, ref) => {
  const [isOpen, setIsOpen] = useState(true);

  // Use the ref on the outermost div that you want to scroll into view
  return (
    <div className="accordion_item">
      <button onClick={() => setIsOpen(!isOpen)} className="item_title">
        <h3 onClick={() => console.log(category, " ccc")} ref={ref}>
          {category?.categoryName} ({category?.items?.length})
        </h3>
        <span className={`icon-downArrow ${isOpen ? "rotate" : ""}`}>
          {/* Icon logic */}
        </span>
      </button>
      {isOpen && (
        <>
          {category.items.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </>
      )}
      <div className="main_border"></div>
    </div>
  );
});

// Main Accordion Component
export const Accordion = ({ categories, categoryRefs }) => {
  return (
    <div className="prod_accordion">
      {categories.map((category) => (
        // Pass the corresponding ref to each accordion item
        <MenuCategoryAccordion
          key={category._id}
          category={category}
          ref={categoryRefs.current[category.categoryName]}
        />
      ))}
    </div>
  );
};
