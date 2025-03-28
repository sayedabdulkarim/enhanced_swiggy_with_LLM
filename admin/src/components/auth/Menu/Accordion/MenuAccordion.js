import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Collapse, Card, Row, Col } from "antd";
import { useUpdateItemStockMutation } from "../../../../apiSlices/menuApiSlice";
import { handleShowAlert } from "../../../../utils/commonHelper";

const { Panel } = Collapse;

const MenuAccordion = ({ menuData, getRestaurantMenuRefetch }) => {
  //misc
  const { restaurantDetails } = useSelector((state) => state.restaurantReducer);
  const dispatch = useDispatch();
  //queries n mutation
  const [
    updateItemStock,
    { isLoading: updateItemStockLoading, error: updateItemStockError },
  ] = useUpdateItemStockMutation();

  //func
  const getImageUrl = (imageId) => {
    return imageId.startsWith("data:image")
      ? imageId
      : `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${imageId}`;
  };

  const handleStockUpdate = async (item) => {
    const { _id, inStock } = item;
    const payload = {
      inStock: inStock ? false : true,
    };
    try {
      const res = await updateItemStock({
        restaurantId: restaurantDetails?._id, // This should be a string
        itemId: _id,
        data: payload,
      }).unwrap();
      getRestaurantMenuRefetch();
      console.log(res, " resss");
      handleShowAlert(dispatch, "success", res?.message);
    } catch (err) {
      handleShowAlert(dispatch, "error", err?.data?.message);
      console.log(err, " errr");
    }
    console.log({ item, payload, restaurantDetails });
  };

  return (
    <Collapse accordion>
      {menuData.map((category) => (
        <Panel
          header={`${category.categoryName} (${category.items.length})`}
          key={category._id}
        >
          {category.items.map((item) => (
            <Card
              key={item._id}
              hoverable
              style={{ width: "100%", marginBottom: 16 }}
            >
              <Row align="middle" gutter={16}>
                <Col xs={24} sm={24} md={9} lg={9} xl={9}>
                  <img
                    alt={item.name}
                    src={getImageUrl(item.imageId)}
                    style={{ width: "100%", height: "auto" }}
                  />
                </Col>
                <Col xs={24} sm={24} md={9} lg={9} xl={9}>
                  <Card.Meta title={item.name} description={item.description} />
                  <p>Price: {item.price}</p>
                  <p>In Stock: {item?.inStock ? "True" : "False"}</p>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <button
                    className="stock_update_button"
                    // onClick={() =>
                    //   console.log(
                    //     { item, restaurantDetails, menuData },
                    //     " item"
                    //   )
                    // }
                    onClick={() => handleStockUpdate(item)}
                  >
                    {item?.inStock ? "Out Of Stock" : "In Stock"}
                  </button>
                </Col>
              </Row>
            </Card>
          ))}
        </Panel>
      ))}
    </Collapse>
  );
};

export default MenuAccordion;
