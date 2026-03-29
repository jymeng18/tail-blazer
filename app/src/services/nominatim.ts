/**
 * API service for reverse geocoding using Nominatim.
 */

import type { NominatimReverseGeocodeRes } from "../types";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org";

export async function reverseGeocode(
  lat: number,
  lng: number,
): Promise<string> {
  const response = await fetch(
    `${NOMINATIM_BASE_URL}/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
    {
      headers: {
        "Accept-Language": "en",
        "User-Agent": "Tail-Blazer-React-App" // if API req fails, check this line first
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to reverse geocode location");
  }

  const data: NominatimReverseGeocodeRes = await response.json();
  return data.display_name;
}

