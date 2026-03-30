/**
 * Leaflet Map component
 */

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { type AnimalReport } from "../types";
import { ReportStatus } from "../types";
import { Link } from "react-router-dom";

interface ReportMapProps {
  reports: AnimalReport[];
}

function ReportMap({ reports }: ReportMapProps) {
  // Only show animals with lost status
  const lostReports = reports.filter((r) => r.status === ReportStatus.Lost);

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={12}
      style={{ height: "900px", width: "100%" }}
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
              <div style={{ textAlign: "center" }}>
                {report.animalPhotoURL && (
                  <img
                    src={report.animalPhotoURL}
                    alt={report.animalName}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                )}
                <h6>{report.animalName}</h6>
                <p>Type: {report.animalType}</p>
                <Link to={`/report/${report.id}`}>View Details</Link>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default ReportMap;
