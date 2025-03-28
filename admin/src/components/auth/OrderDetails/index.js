import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "antd";
import OrderActionModal from "./OrderActionModal";
import { useUpdateOrderItemStatusMutation } from "../../../apiSlices/ordersApiSlice";
import { useBulkUpdateItemStockMutation } from "../../../apiSlices/menuApiSlice";
import { handleShowAlert } from "../../../utils/commonHelper";

const Index = ({
  isLoadingetGetOrdersDetailsFromRestaurantId,
  getOrdersDetailsFromRestaurantId,
  getOrdersDetailsFromRestaurantIdRefetch,
  getRestaurantMenuRefetch,
}) => {
  const dispatch = useDispatch();
  const { restaurantDetails } = useSelector((state) => state.restaurantReducer);
  const { orders } = getOrdersDetailsFromRestaurantId || { orders: [] };
  //queries n mutation
  const [
    updateOrderItemStatus,
    {
      isLoading: updateOrderItemStatusLoading,
      error: updateOrderItemStatusError,
    },
  ] = useUpdateOrderItemStatusMutation();

  const [
    bulkUpdateItemStock,
    { isLoading: bulkUpdateItemStockLoading, error: bulkUpdateItemStockError },
  ] = useBulkUpdateItemStockMutation();
  //state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  //func
  const handleOrderAction = async (data) => {
    // console.log({ data, selectedItem }, " ddd");
    const { _id, items } = selectedItem;
    const payload = {
      orderId: _id,
      // itemId: items[0]?._id,
      newStatus: data?.action,
      cancelledReason:
        data?.action === "reject"
          ? data?.reason === "other"
            ? data?.otherReason
            : data?.reason
          : "",
    };
    await handleBulkUpdateStockItemOnReject(data);
    ///
    try {
      const res = await updateOrderItemStatus({
        restaurantId: selectedItem?.restaurantId,
        payload: payload,
      }).unwrap();
      console.log(res, " resss");
      getOrdersDetailsFromRestaurantIdRefetch();
      getRestaurantMenuRefetch();
      handleShowAlert(dispatch, "success", res?.message);
    } catch (err) {
      handleShowAlert(dispatch, "error", err?.data?.message);
      console.log(err, " errr");
    }
  };

  const handleBulkUpdateStockItemOnReject = async (data) => {
    const payload = {
      itemIds: data?.outOfStockItems,
      inStock: false,
    };
    // console.log(
    //   { data, payload },
    //   " dattaa from handleBulkUpdateStockItemOnReject"
    // );

    if (data?.action === "reject" && data?.reason === "Out Of Stock") {
      try {
        const res = await bulkUpdateItemStock({
          restaurantId: selectedItem?.restaurantId,
          itemIds: data?.outOfStockItems,
          inStock: false,
        }).unwrap();
        console.log(res, " resss");
        // getOrdersDetailsFromRestaurantIdRefetch();
        handleShowAlert(dispatch, "success", res?.message);
      } catch (err) {
        handleShowAlert(dispatch, "error", err?.data?.message);
        console.log(err, " errr");
      }
    }
  };

  const handleOpenModal = (data) => {
    setIsModalVisible(true);
    setSelectedItem(data);
  };

  //

  return (
    <div>
      {isLoadingetGetOrdersDetailsFromRestaurantId ? (
        <Skeleton active paragraph={{ rows: 15 }} />
      ) : (
        <>
          {!orders?.length ? (
            <div
              className="empty_order_wrapper"
              onClick={() => console.log(orders)}
            >
              No Restaurant Orders found
            </div>
          ) : (
            <div className="order_listing_wrapper">
              <h2>Orders Listing</h2>
              <ul>
                {orders?.map((orderItem) => {
                  const {
                    _id,
                    finalCost,
                    addressDetails,
                    createdAt,
                    items,
                    status,
                  } = orderItem;
                  return (
                    <li key={_id} onClick={() => console.log(orders)}>
                      <div className="left_section">
                        {items?.map((item, index) => {
                          const {
                            count,
                            description,
                            imageId,
                            inStock,
                            name,
                            price,
                            _id,
                          } = item;
                          return (
                            <span key={_id} className="count">
                              <span className="name">{name}</span> x {count}
                              {index !== items.length - 1 && ", "}
                            </span>
                          );
                        })}
                        <div className="address_det">
                          <h4 className="title">Address :</h4>

                          <div className="address_description">
                            <div className="landmark">{`${addressDetails?.doorNumber}, ${addressDetails?.landmark}`}</div>
                            <div className="address_txt">
                              {addressDetails?.address}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="right_section">
                        <div>Status : {status}</div>
                        <button onClick={() => handleOpenModal(orderItem)}>
                          Accept/ Reject
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <OrderActionModal
                selectedItem={selectedItem}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                handleOrderAction={handleOrderAction}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Index;
