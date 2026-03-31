/**
 * Home Page, that shows the interacitve leaflet js map
 * and the location markers for missing pets
 */
import { useState } from "react";
import { FilterControls, MapPage, ReportCard } from "../components";
import { useReports } from "../hooks";
import "../styles/HomePage.css";
import type { AnimalReport } from "../types";

function HomePage() {
  const { reports, loading, error } = useReports();

  // Users can see in map or view mode
  const [viewMode, setViewMode] = useState<"map" | "list">("map");

  // Filter controls
  const [filters, setFilters] = useState({
    animalType: "all",
    status: "all",
  });

  function filterReports(reportList: AnimalReport[]): AnimalReport[] {
    let filtered = reportList;

    if (filters.animalType !== "all") {
      filtered = filtered.filter(
        (report) => report.animalType === filters.animalType,
      );
    }

    if (filters.status !== "all") {
      filtered = filtered.filter((report) => report.status === filters.status);
    }
    return filtered;
  }

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
            <span className="">Loading Reports...</span>
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
        <div className="list-view">
          <div className="list-container">
            <div className="list-container-header">
              <FilterControls filters={filters} onFilterChange={setFilters} />
            </div>

            <div className="report-cards-grid">
              {filterReports(reports).map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>

            {/* Filter shows no results  */}
            {filterReports(reports).length === 0 && reports.length > 0 && (
              <div className="empty-state">
                <h3>No Matching Reports</h3>
                <p>Try adjusting your filters to see more results.</p>
              </div>
            )}

            {/* zero reports in jsonbin */}
            {reports.length === 0 && (
              <div className="empty-state">
                <h3>No Reports Yet</h3>
                <p>Be the first to report a missing pet!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
