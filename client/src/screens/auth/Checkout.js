import React from "react";
import AddressesSection from "../../components/auth/Checkout/AddressSection";
import CartComponent from "../../components/auth/Checkout/CartComponent";
//apiSLice
import { useGetAddressesByUserQuery } from "../../apiSlices/addressApiSlice";

const Checkout = () => {
  // RTK Query hook
  const {
    data: getAddressData,
    refetch,
    isLoading: isLoadingAddressData,
  } = useGetAddressesByUserQuery();

  return (
    <div className="nDVxx _340-t cart_container">
      <div className="_3-bcQ cart_wrapper" style={{ padding: "40px 0" }}>
        {/* left */}
        {isLoadingAddressData ? (
          <h1>Loading....</h1>
        ) : (
          <>
            <AddressesSection getAddressData={getAddressData} />
            {/* right */}
            <CartComponent />
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
