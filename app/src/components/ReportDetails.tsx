/**
 * Displays all report fields,
 * allows users to Mark as Found given
 * they have the password
 */

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useReports } from "../hooks";
import { ReportStatus } from "../types";
import { hashPassword, updateReport } from "../services";

function ReportDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { reports, loading, error } = useReports();

  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  if (loading) {
    return (
      <div className="container mt-4">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  // Find the specific report
  const report = reports.find((r) => r.id === id);

  if (!report) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">Report not found.</div>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Back to Home
        </button>
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

  return (
    <div className="container mt-4">
      <h2>{report.animalName}</h2>

      {report.animalPhotoURL && (
        <div className="mb-3">
          <img
            src={report.animalPhotoURL}
            alt={report.animalName}
            className="img-fluid"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </div>
      )}

      {/* Animal type */}
      <div className="mb-3">
        <strong>Type:</strong> {report.animalType}
      </div>
      
      {/* Pet status, found or lost */}
      <div className="mb-3">
        <strong>Status:</strong>{" "}
        <span
          className={`badge ${report.status === ReportStatus.Lost ? "bg-danger" : "bg-success"}`}
        >
          {report.status}
        </span>
      </div>

      {/* Pet desc */}
      <div className="mb-3">
        <strong>Description:</strong>
        <p>{report.desc}</p>
      </div>

      {/* owner contacts */}
      <div className="mb-3">
        <strong>Contact Information:</strong>
        <p>{report.contactInfo}</p>
      </div>


      {/* Report location may be null if user marks middle of nowhere on map */}
      {report.location && (
        <div className="mb-3">
          <strong>Last Seen Location:</strong>
          <p>{report.location.address}</p>
        </div>
      )}

      {/* date of post */}
      <div className="mb-3">
        <strong>Date Posted:</strong>
        <p>{new Date(report.createdAt).toLocaleDateString()}</p>
      </div>

      {report.status === ReportStatus.Lost && !showPasswordPrompt && (
        <button
          className="btn btn-success"
          onClick={() => setShowPasswordPrompt(true)}
        >
          Mark as Found
        </button>
      )}

      
      {/* User has attempted to mark as found */}
      {showPasswordPrompt && (
        <div className="mt-3 p-3 border rounded">
          <h5>Enter Password to Mark as Found</h5>
          {passwordError && (
            <div className="alert alert-danger">{passwordError}</div>
          )}
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="btn btn-success me-2"
            onClick={handleMarkAsFound}
            disabled={updating}
          >
            {updating ? "Updating..." : "Confirm"}
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => {
              setShowPasswordPrompt(false);
              setPassword("");
              setPasswordError(null);
            }}
          >
            Cancel
          </button>
        </div>
      )}

      <div className="mt-3">
        <button
          className="btn btn-outline-primary"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default ReportDetails;
