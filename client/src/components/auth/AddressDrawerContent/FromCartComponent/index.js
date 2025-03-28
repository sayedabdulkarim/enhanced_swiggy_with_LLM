import React, { useEffect, useState } from "react";
import MapComponent from "./MapComponent";
import { useDispatch, useSelector } from "react-redux";
import { useAddAddressMutation } from "../../../../apiSlices/addressApiSlice";

const FromCartComponent = () => {
  //queires n mutation
  const [
    addAddress,
    { isLoading, isSuccess, data: addAddressData, isError, error },
  ] = useAddAddressMutation();

  //state
  const [formData, setFormData] = useState({
    mapObj: {},
    flatNo: "",
    landMark: "",
    landMarkType: "",
  });

  //function
  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { mapObj, flatNo, landMark, landMarkType } = formData;
    const data = {
      address: mapObj?.address,
      doorNumber: flatNo,
      landmark: landMark,
      location: {
        type: "Point",
        coordinates: [mapObj?.center?.lng, mapObj?.center?.lat],
      },
      type: landMarkType,
    };
    console.log(formData, " formData");
    addAddress(data);
  };

  return (
    <div>
      <MapComponent handleChange={handleChange} />
      {/* form */}
      <div className="jbXOs" style={{ marginTop: "100px" }}>
        <div>
          <div className="_3Um38 _23P1X">
            <input
              className="_381fS"
              type="text"
              name="flatNo"
              id="building"
              tabIndex="1"
              autoComplete="off"
              value={formData?.flatNo}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <div className="_2EeI1"></div>
            <label className="_1Cvlf" htmlFor="building">
              Door / Flat No.
            </label>
          </div>
        </div>
        <div>
          <div className="_3Um38 _23P1X">
            <input
              className="_381fS"
              type="text"
              name="landMark"
              id="landmark"
              tabIndex="1"
              autoComplete="off"
              value={formData?.landMark}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <div className="_2EeI1"></div>
            <label className="_1Cvlf" htmlFor="landmark">
              Landmark
            </label>
          </div>
        </div>
        <div className="_2i256">
          <div
            className={`_1dzL9 ${
              formData?.landMarkType === "Home" ? "_2I0ZJ" : ""
            }`}
            onClick={() => handleChange("landMarkType", "Home")}
          >
            <span
              className={`_3Ey3V ${
                formData?.landMarkType === "Home"
                  ? "icon-homeDark"
                  : "icon-home"
              }`}
            ></span>
            <div className="sf8jl">Home</div>
          </div>
          <div
            className={`_1dzL9 ${
              formData?.landMarkType === "Work" ? "_2I0ZJ" : ""
            }`}
            onClick={() => handleChange("landMarkType", "Work")}
          >
            <span
              className={`_3Ey3V ${
                formData?.landMarkType === "Work"
                  ? "icon-workDark"
                  : "icon-work"
              }`}
            ></span>
            <div className="sf8jl">Work</div>
          </div>
          <div
            className={`_1dzL9 ${
              formData?.landMarkType === "Other" ? "_2I0ZJ" : ""
            }`}
            onClick={() => handleChange("landMarkType", "Other")}
          >
            <span
              className={`_3Ey3V ${
                formData?.landMarkType === "Other"
                  ? "icon-markerDark"
                  : "icon-location"
              }`}
            ></span>
            <div className="sf8jl">Other</div>
          </div>
          {/* <div className="_1qe1S">
            <div className="_3Um38 _3vwW5">
              <input
                className="_381fS _1oTLG _2VYMY"
                type="text"
                name="annotation"
                id="annotation"
                tabIndex="1"
                placeholder="Dad’s home, my man cave"
                maxlength="20"
                value=""
              />
              <div className="_2EeI1 _26LFr"></div>
              <label className="_1Cvlf _2tL9P" htmlFor="annotation"></label>
            </div>
          </div> */}
        </div>
      </div>
      {/* button */}
      <div className="gbzB0">
        <div className="_25qBi">
          <button className="_2sd1x" onClick={handleSubmit}>
            SAVE ADDRESS &amp; PROCEED
          </button>
        </div>
      </div>
    </div>
  );
};

export default FromCartComponent;
