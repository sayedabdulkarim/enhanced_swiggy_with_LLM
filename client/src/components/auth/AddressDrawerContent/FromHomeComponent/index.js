import React from "react";

const AddressDrawerContent = () => {
  return (
    <div>
      {/* input */}
      <div className="_1hjIq">
        <div className="_3Um38 ">
          <input
            className="_381fS _1oTLG _1H_62"
            type="text"
            name=""
            placeholder="Search for area, street name.."
            value=""
          />
          <div className="_2EeI1 _26LFr"></div>
          <label className="_1Cvlf _2tL9P"></label>
        </div>
      </div>
      {/* current location */}
      <div className="_96hVG">
        <div className="_2peD4">
          <div className="J80xC">
            <div className="icon-location-crosshair _13AY4"></div>
            <div className="_3eFzL">
              <div className="Ku2oK">Get current location</div>
              <div className="_1joFh">Using GPS</div>
            </div>
          </div>
        </div>
      </div>
      {/* address */}
      <div className="_96hVG">
        <div className="_2vuQq">SAVED ADDRESSES</div>
        <div>
          <div className="_2peD4">
            <div className="J80xC">
              <div className="icon-home undefined _13AY4"></div>
              <div className="_3eFzL">
                <div className="Ku2oK">Home</div>
                <div className="_1joFh">
                  Elite Homes, 2nd floor, 10th Cross, 9th Main, HBR layout,
                  Hennur Gardens, Bengaluru, Karnataka 560043, India
                </div>
              </div>
            </div>
          </div>
          <div className="_2peD4">
            <div className="J80xC">
              <div className="icon-work undefined _13AY4"></div>
              <div className="_3eFzL">
                <div className="Ku2oK">Work</div>
                <div className="_1joFh">
                  ground floor, Kudlu, Bengaluru, Karnataka 560068, India.
                  (Singasandra)
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="_3Gwq1">View More</div>
      </div>
    </div>
  );
};

export default AddressDrawerContent;
