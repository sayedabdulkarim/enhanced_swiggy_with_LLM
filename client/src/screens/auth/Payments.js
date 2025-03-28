import React, { useState } from "react";

import PaymentMainComponent from "../../components/auth/Payment/MainComponent";
import CashOnDelivery from "../../components/auth/Payment/paymentOption/CashOnDelivery";

const Payments = () => {
  const [isPaymentType, setIsPaymentType] = useState(null);
  return (
    <>
      {isPaymentType ? (
        <CashOnDelivery setIsPaymentType={setIsPaymentType} />
      ) : (
        <PaymentMainComponent setIsPaymentType={setIsPaymentType} />
      )}
    </>
  );
};

export default Payments;
