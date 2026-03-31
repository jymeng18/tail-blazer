/**
 * Entire map page including reports 
 */

import { useReports } from "../hooks";
import ReportMap from "./ReportMap";
import "../styles/MapPage.css";

function MapPage() {
  const { reports, error } = useReports();

  if (error) {
    return (
      <div className="map-page-container">
        <div className="map-page-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="map-page-container">
      <ReportMap reports={reports} />
    </div>
  );
}

export default MapPage;