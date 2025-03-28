import React, { useState } from "react";

const GeneralIssues = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection !== section ? section : null);
  };

  const getIconClass = (section) => {
    return activeSection === section
      ? "fas fa-chevron-up"
      : "fas fa-chevron-down";
  };

  const getSectionClass = (section) => {
    return activeSection === section ? "d-block" : "d-none";
  };

  return (
    <div className={"common_section"}>
      <h3>Help with Orders</h3>

      {/* Repeat this block for each accordion item */}
      <div className={"One"}>
        <div onClick={() => toggleSection("one")} className={"Accordianitem"}>
          <h4>I have a query related to placing an order</h4>
          <i className={getIconClass("one")} />
        </div>
        <p className={getSectionClass("one")}>
          The logic of validations of CVV resides with either payment gateways
          or banks. It is absolutely the choice of banks to have CVV as a
          mandatory input field or not. As per RBI guidelines,
          2-Factor-Authentication is not mandatory for less than Rs 2000 rupees
          transaction. It is not in control of Swiggy. As an organization, we
          don't store any card information.
        </p>
      </div>

      <div className={"One"}>
        <div onClick={() => toggleSection("two")} className={"Accordianitem"}>
          <h4>I am unable to log in on Swiggy</h4>
          <i className={getIconClass("two")} />
        </div>
        <p className={getSectionClass("two")}>
          Your order can be edited before it reaches the restaurant. You could
          contact customer support team via chat or call to do so. Once order is
          placed and restaurant starts preparing your food, you may not edit its
          contents
        </p>
      </div>

      {/* ...repeat for other sections... */}

      {/* ...add other sections here with similar structure... */}
    </div>
  );
};

export default GeneralIssues;
