import React from "react";
import { useSelector, useDispatch } from "react-redux";
//component
import AddressesComponent from "./AddressComponent";
import SelectedAddressComponent from "./SelectedAddressComponent";

const Index = ({ getAddressData }) => {
  const { selectedAddress } = useSelector((state) => state.cartReducer);
  return (
    <>
      {selectedAddress ? (
        <SelectedAddressComponent />
      ) : (
        <AddressesComponent getAddressData={getAddressData} />
      )}
    </>
  );
};

export default Index;
