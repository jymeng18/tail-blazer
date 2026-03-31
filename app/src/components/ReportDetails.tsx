/**
 * Display all report fields for a specific entry
 * based off of their id
 */

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useReports } from "../hooks";
import { ReportStatus } from "../types";
import { hashPassword, updateReport } from "../services";
import "../styles/ReportDetails.css";

function ReportDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { reports, loading, error } = useReports();

  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);


  // Find the specific report
  const report = reports.find((r) => r.id === id);

  if (error) {
    return (
      <div className="report-details-container">
        <section className="d-flex flex-column justify-content-center align-items-center">
          <div className="not-found-message">Report not found.</div>
          <button className="btn-back" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </section>
      </div>
    );
  }


  async function handleMarkAsFound() {
    if (!password) {
      setPasswordError("Please enter your password.");
      return;
    }

    if (!report) {
      return;
    }

    setUpdating(true);
    setPasswordError(null);

    // Compare hashes for auth
    try {
      const hashedInput = await hashPassword(password);

      if (hashedInput !== report.passwordHash) {
        setPasswordError("Incorrect password.");
        setUpdating(false);
        return;
      }

      // Mark report as found
      await updateReport({
        ...report,
        status: ReportStatus.Found,
      });
      navigate("/");
    } catch (err) {
      setPasswordError(
        err instanceof Error ? err.message : "Failed to update report.",
      );
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <div>
          <span className="load-msgs">Loading Reports...</span>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="report-details-container">
        <section className="d-flex flex-column justify-content-center align-items-center">
          <div className="not-found-message">Report not found.</div>
          <button className="btn-back" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </section>
      </div>
    );
  }

  return (
    <div>
      <div className="report-details-container">
        <h2>{report.animalName}</h2>

        {report.animalPhotoURL && (
          <img
            src={report.animalPhotoURL}
            alt={report.animalName}
            className="report-image"
          />
        )}

        {/* Animal type */}
        <div className="detail-field">
          <strong>Type:</strong>
          <p>{report.animalType}</p>
        </div>

        {/* Pet status, found or lost */}
        <div className="detail-field">
          <strong>Status:</strong>
          <p>
            <span
              className={`status-badge ${report.status === ReportStatus.Lost ? "lost" : "found"}`}
            >
              {report.status}
            </span>
          </p>
        </div>

        {/* Pet desc */}
        <div className="detail-field">
          <strong>Description:</strong>
          <p>{report.desc}</p>
        </div>

        {/* owner contacts */}
        <div className="detail-field">
          <strong>Contact Information:</strong>
          <p>{report.contactInfo}</p>
        </div>

        {/* Report location may be null if user marks middle of nowhere on map */}
        {report.location && (
          <div className="detail-field">
            <strong>Last Seen Location:</strong>
            <p>{report.location.address}</p>
          </div>
        )}

        {/* date of post */}
        <div className="detail-field">
          <strong>Date Posted:</strong>
          <p>{new Date(report.createdAt).toLocaleDateString()}</p>
        </div>

        <div className="btn-mark-found-container">
          {report.status === ReportStatus.Lost && !showPasswordPrompt && (
            <button
              className="btn-mark-found"
              onClick={() => setShowPasswordPrompt(true)}
            >
              Mark as Found
            </button>
          )}
        </div>

        <section></section>
        {/* User has attempted to mark as found */}
        {showPasswordPrompt && (
          <div className="password-prompt-container">
            <h5>Enter Password to Mark as Found</h5>
            {passwordError && (
              <div className="password-error">{passwordError}</div>
            )}
            <div className="password-input-wrapper">
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="button-group">
              <button
                className="btn-confirm"
                onClick={handleMarkAsFound}
                disabled={updating}
              >
                {updating ? "Updating..." : "Confirm"}
              </button>

              <button
                className="btn-cancel"
                onClick={() => {
                  setShowPasswordPrompt(false);
                  setPassword("");
                  setPasswordError(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="back-button-container">
          <button className="btn-back" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportDetails;
