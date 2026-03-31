import { useState, useEffect } from "react";
import type { AnimalReport } from "../types";
import { getReports } from "../services";

export function useReports() {
  const [reports, setReports] = useState<AnimalReport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadReports() {
      try {
        setLoading(true);
        const data = await getReports();
        setReports(data);
        setError(null);
      } catch (err) {
        setError(
          // We have custom err msgs thrown for api errors, otherwise use default msg
          err instanceof Error ? err.message : "Failed to load reports."
        );
      } finally {
        setLoading(false);
      }
    }

    loadReports();
  }, []);

  return { reports, loading, error };
}
