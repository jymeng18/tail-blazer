/**
 * Home Page, that shows the interacitve leaflet js map 
 * and the location markers for missing pets
 */
import { useState } from "react";
import { MapPage } from "../components";
import { useReports } from "../hooks";

function HomePage() {
  const { reports, loading, error } = useReports();
  const [viewMode, setViewMode] = useState<"map" | "list">("map");

  if(loading)[
    // TODO: 
  ]

  if(error){
    // TODO:
  }

  return (
    <div>
      // TODO: viewMode buttons, can be List or Map, List will display every single report(but not every single report field)

      {viewMode === "map" && (
        <MapPage />
      )}


      
    </div>
  );
}

export default HomePage;