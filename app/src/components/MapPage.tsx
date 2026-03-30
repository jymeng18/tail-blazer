/**
 * Entire map page including reports 
 */

import { useReports } from "../hooks";
import ReportMap from "./ReportMap";

function MapPage() {
  const { reports, error } = useReports();

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return <ReportMap reports={reports} />;
}

export default MapPage;