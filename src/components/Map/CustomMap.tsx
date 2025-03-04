"use client";

import { useState } from "react";
import { APIProvider, Map, Marker} from "@vis.gl/react-google-maps";

const CustomMapInner = () => {
  const [markerLocation] = useState({
    lat: 14.6913687,
    lng: -90.5276527,
  });

  return (
    <div className="w-full h-full">
      <Map
        style={{ width: '100%', height: '100%' }}
        defaultZoom={13}
        defaultCenter={markerLocation}
        gestureHandling={"greedy"}
        disableDefaultUI
      >
        <Marker position={markerLocation} />
      </Map>
    </div>
  );
};

export const CustomMap = () => {
  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}>
      <CustomMapInner />
    </APIProvider>
  );
};
