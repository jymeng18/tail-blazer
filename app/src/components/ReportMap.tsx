/**
 * Leaflet Map component
 */

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { type AnimalReport } from "../types";
import { ReportStatus } from "../types";
import { Link } from "react-router-dom";
import "../styles/ReportMap.css";

interface ReportMapProps {
  reports: AnimalReport[];
}

function ReportMap({ reports }: ReportMapProps) {
  // Only show animals with lost status
  const lostReports = reports.filter((r) => r.status === ReportStatus.Lost);

  return (
    <div className="map-container">
      <MapContainer
        center={[49.2784, -122.9172]}
        zoom={12}
        className="map-wrapper"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {lostReports.map((report) => {
          if (!report.location) {
            return null;
          }

          // For each valid report, assign a location marker to them on the map
          return (
            <Marker
              position={[report.location.lat, report.location.lon]}
              key={report.id}
            >
              <Popup>
                <div className="popup-content">
                  {report.animalPhotoURL ? (
                    <img
                      src={report.animalPhotoURL}
                      alt={report.animalName}
                      className="popup-image"
                    />
                  ) : (
                    <div className="no-photo-placeholder">🐾</div>
                  )}
                  <h6>{report.animalName}</h6>
                  <p>Type: {report.animalType}</p>
                  <Link to={`/report/${report.id}`} className="popup-link">
                    View Details
                  </Link>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default ReportMap;
