/**
 * Small section of the Animal Report form,
 * User selects the last location on the map their pet was seen
 */

import type { LatLngExpression } from "leaflet";
import { useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

interface LocationPickerProps {
  onLocationSelection: (lat: number, lon: number) => void;
}

// Sub component part that is part of LocationPicker, this serves as the location mark on the map
function LocationMarker({ onLocationSelection }: LocationPickerProps) {
  const [position, setPosition] = useState<LatLngExpression | null>(null);

  // Get map coords on mouse pos
  useMapEvents({
    click: (e) => {
      setPosition(e.latlng);
      onLocationSelection(e.latlng.lat, e.latlng.lng); // this fn will be used to set the fields in the form,
    },
  });

  if (position === null) {
    return null;
  }

  return <Marker position={position} />;
}

// Note; a prop is passed to LocationPicker, which then uses it as a prop for LocationMarker
function LocationPicker({ onLocationSelection }: LocationPickerProps) {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={12}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
        <LocationMarker onLocationSelection={onLocationSelection} />
    </MapContainer>
  );
}

export default LocationPicker;
