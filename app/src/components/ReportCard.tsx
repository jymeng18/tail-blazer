/**
 * Card for each report
 */

import "../styles/ReportCard.css";
import { ReportStatus, type AnimalReport } from "../types";
import { Link } from "react-router-dom";

interface ReportCardProps {
  report: AnimalReport;
}

function ReportCard({ report }: ReportCardProps) {
  const isFound = report.status === ReportStatus.Found;
  const statusClass = isFound ? "status-badge found" : "status-badge lost";
  const statusText = isFound ? "Found" : "Lost";

  return (
    <div className="report-card">
      {report.animalPhotoURL ? (
        <img
          src={report.animalPhotoURL}
          className="report-card-image"
          alt={report.animalName}
        />
      ) : (
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJSvFenuJcKrz9jg2fJzi7FLhwL14kMOvGBA&s"
          className="report-card-image"
          alt={report.animalName}
        />
      )}

      <div className="report-card-content">
        <h3 className="report-card-title">{report.animalName}</h3>

        <div className="report-card-badges">
          <span className={statusClass}>{statusText}</span>
          <span className="animal-type-badge">{report.animalType}</span>
        </div>

        {report.location && (
          <div className="report-card-location">
            <strong>Last Seen:</strong>
            <p>{report.location.address}</p>
          </div>
        )}

        <Link to={`/report/${report.id}`} className="btn-view-details">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ReportCard;
