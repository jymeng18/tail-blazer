/**
 * Card for each report
 */

import "../styles/ReportCard.css"
import { ReportStatus, type AnimalReport } from "../types";
import { Link } from "react-router-dom";

interface ReportCardProps {
  report: AnimalReport;
}

function ReportCard({ report }: ReportCardProps) {
  const isFound = report.status === ReportStatus.Found;
  const statusBadgeClass = isFound ? 'bg-success' : 'bg-warning text-dark';
  const statusText = isFound ? 'Found' : 'Lost';

  return (
    <div className="card h-100">
      <img
        src={report.animalPhotoURL}
        className="card-img-top"
        alt={report.animalName}
      />
      
      <div className="card-body">
        <h5 className="card-title">{report.animalName}</h5>
        
        <p className="card-text">
          <span className={`badge ${statusBadgeClass}`}>
            {statusText}
          </span>
          {" "}
          <span className="badge bg-secondary">
            {report.animalType}
          </span>
        </p>

        {report.location && (
          <p className="card-text text-muted small">
            Last seen: {report.location.address}
          </p>
        )}

        <Link to={`/report/${report.id}`} className="btn btn-primary btn-sm">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ReportCard;
