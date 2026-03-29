/**
 * Service for interacting with JSONBin API.
 * All functions must be asynchronous and work with promises
 */

import type { AnimalReport, JSONBinFetchRes } from "../types";

const JSONBIN_BASE_URL = "https://api.jsonbin.io/v3";
const JSONBIN_BIN_ID = import.meta.env.VITE_JSONBIN_BIN_ID;
const JSONBIN_API_KEY = import.meta.env.VITE_JSONBIN_API_KEY;

function getHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
    "X-Master-key": JSONBIN_API_KEY,
  };
}

// GET Request to fetch all reports
export async function getReports(): Promise<AnimalReport[]> {
  if (!JSONBIN_BIN_ID) {
    throw new Error(
      "JSONBin ID is not configured. Please create a bin, and copy its ID.",
    );
  }

  const res = await fetch(`${JSONBIN_BASE_URL}/b/${JSONBIN_BIN_ID}/latest`, {
    headers: getHeaders(),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to get all reports: ${err}`);
  }

  const data: JSONBinFetchRes = await res.json();
  return data.records.reports;
}

export async function saveReport(report: AnimalReport): Promise<void> {
  if (!report) {
    throw new Error("Report is not valid.");
  }

  const reports: AnimalReport[] = await getReports();
  reports.push(report);

  const res = await fetch(`${JSONBIN_BASE_URL}/b/${JSONBIN_BIN_ID}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({ reports }),
  });

  if (!res.ok) {
    throw new Error("Report failed to save.");
  }
  return;
}

// Used to update a report as status: found
export async function updateReport(updated: AnimalReport): Promise<void> {
  const reports = await getReports();
  const newReports = reports.map((r) => (r.id === updated.id ? updated : r));
  
  const res = await fetch(`${JSONBIN_BASE_URL}/b/${JSONBIN_BIN_ID}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({ reports: newReports }),
  });

  if (!res.ok) throw new Error("Failed to update report.");
}
