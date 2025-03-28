import React, { useState } from "react";

function DeliverInputField() {
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const handleLocateClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        // Optionally set the coordinates in the input box
        setLocation(
          `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`
        );
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Entered Location:", location);
    console.log("Coordinates:", coordinates);
    // Process the location or coordinates further as needed
  };

  return (
    <form onSubmit={handleSubmit} className="location-form">
      <div className="input-group _3Um38 _2oQ4_">
        <input
          type="text"
          value={location}
          onChange={handleInputChange}
          placeholder="Enter your delivery location"
          className="location-input _381fS _1oTLG _3BIgv"
        />
        <button
          type="button"
          onClick={handleLocateClick}
          className="locate-btn _1fiQt"
        >
          <span className="icon-location-crosshair _25lQg"></span>
          Locate Me
        </button>
        <input type="submit" value="FIND FOOD" className="submit-btn _3iFC5" />
      </div>
    </form>
  );
}

export default DeliverInputField;
