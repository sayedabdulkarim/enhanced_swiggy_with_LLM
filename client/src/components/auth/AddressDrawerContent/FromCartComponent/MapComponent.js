import React, { useState, useEffect, useRef } from "react";
import GoogleMapReact from "google-map-react";

const CustomMarker = ({ imageSrc }) => (
  <div
    style={{
      position: "absolute",
      transform: "translate(-50%, -50%)",
    }}
  >
    <img
      src={imageSrc}
      alt="Custom Marker"
      style={{ height: "50px", width: "20px" }} // Adjust the size as needed
    />
  </div>
);

const MapComponent = ({ handleChange }) => {
  const [center, setCenter] = useState({ lat: 12.9716, lng: 77.5946 }); // Default to Bangalore as an example
  const [address, setAddress] = useState("");
  const prevCenter = useRef(center);
  const prevAddress = useRef(address);
  const [markerVisible, setMarkerVisible] = useState(true); //
  // This function performs reverse geocoding
  const reverseGeocode = async (lat, lng) => {
    const API_KEY = "AIzaSyDhfax4vDfrht7K17odVAEx1Vtq20YwfIk"; // Replace with your actual API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setAddress(data.results[0].formatted_address);
      } else {
        setAddress("No address found");
      }
    } catch (error) {
      console.error("Error with reverse geocoding", error);
      setAddress("Error finding address");
    }
  };

  const handleApiLoaded = ({ map, maps }) => {
    // Perform actions once the API is loaded
    setMarkerVisible(true); // Ensure marker is visible once the map is loaded
  };

  const handleOnChange = ({ center }) => {
    setCenter(center);
    setMarkerVisible(true); // Ensure marker is visible after dragging
    reverseGeocode(center.lat, center.lng);
  };

  //async
  useEffect(() => {
    // Attempt to get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(pos);
          reverseGeocode(pos.lat, pos.lng);
        },
        (error) => {
          console.error("Error retrieving your location", error);
          alert("Error retrieving your location");
        }
      );
    } else {
      // Set to a default position if geolocation is not enabled or available
      reverseGeocode(center.lat, center.lng);
    }
  }, []);

  useEffect(() => {
    // Check if center or address actually changed
    if (
      prevCenter.current.lat !== center.lat ||
      prevCenter.current.lng !== center.lng ||
      prevAddress.current !== address
    ) {
      handleChange("mapObj", { center, address });

      // Update previous values
      prevCenter.current = center;
      prevAddress.current = address;
    }
  }, [center, address, handleChange]);

  // Define the marker image URL here
  const markerImageUrl =
    "https://media-assets.swiggy.com/swiggy/image/upload/Other_Pin_urgkbb.png";

  // console.log({
  //   center,
  //   address,
  // });
  return (
    <div style={{ height: "300px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDhfax4vDfrht7K17odVAEx1Vtq20YwfIk" }} // Replace with your actual API key
        center={center}
        defaultZoom={8}
        onGoogleApiLoaded={handleApiLoaded}
        onChange={handleOnChange}
        // onChange={({ center }) => {
        //   setCenter(center);
        //   reverseGeocode(center.lat, center.lng);
        // }}
        yesIWantToUseGoogleMapApiInternals
      >
        <CustomMarker
          lat={center.lat}
          lng={center.lng}
          imageSrc={markerImageUrl}
        />
      </GoogleMapReact>
      <div className="_3Um38 _9Wk87">
        <input className="_381fS" disabled type="text" value={address} />
        <div className="_2EeI1 _26LFr"></div>
        <label className="_1Cvlf _2tL9P">Address</label>
      </div>
    </div>
  );
};

export default MapComponent;
