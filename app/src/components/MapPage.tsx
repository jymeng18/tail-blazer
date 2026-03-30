/**
 * Entire map page including reports 
 */

import { useEffect, useState } from "react";
import type { AnimalReport } from "../types";
import { getReports } from "../services";
import ReportMap from "./ReportMap";

function MapPage() {
  const [reports, setReports] = useState<AnimalReport[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadReports(){
      try {
        const data = await getReports();
        setReports(data);
      } catch(err) {
        setError("Failed to load reports.");
      }
    }

    loadReports();
  }, []); // run once on mount 

  if(error) console.log('error')

  return <ReportMap reports={reports} />

}

export default MapPage;