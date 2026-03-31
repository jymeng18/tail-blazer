/**
 * Home Page, that shows the interacitve leaflet js map
 * and the location markers for missing pets
 */
import { useState } from "react";
import { MapPage, ReportCard } from "../components";
import { useReports } from "../hooks";
import "../styles/HomePage.css";

function HomePage() {
  const { reports, loading, error } = useReports();

  // Users can see in map or view mode
  const [viewMode, setViewMode] = useState<"map" | "list">("map");

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          Error loading reports: {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      {loading && (
        <div className="container text-center mt-5">
          <div className="spinner-border text-primary" role="status"></div>
          <div>
            <span className="load-msgs">Loading Reports...</span>
          </div>
        </div>
      )}

      <section className="view-toggle-section">
        <button className="view-toggle-btn" onClick={() => setViewMode("map")}>
          Map View
        </button>
        <button className="view-toggle-btn" onClick={() => setViewMode("list")}>
          List View
        </button>
      </section>

      {viewMode === "map" && <MapPage />}

      {viewMode === "list" && (
        <div className="container list-view my-4">
          {/* Filter controls */}

          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {reports.map((report) => (
              <div key={report.id} className="col">
                <ReportCard report={report} />
              </div>
            ))}
          </div>

          {reports.length === 0 && (
            <div className="alert alert-info text-center" role="alert">
              No reports found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default HomePage;
