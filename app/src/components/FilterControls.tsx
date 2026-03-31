/**
 * Filter controls for the list view
 */

import type React from "react";
import "../styles/FilterControls.css";
import { AnimalType, ReportStatus } from "../types";

// HomePage.tsx passes down intial filter controls and a function so that we can
// manage the state of filters (no filtering done in here)
interface FilterControlsProps {
  filters: { animalType: string; status: string };
  onFilterChange: (filters: { animalType: string; status: string }) => void;
}

function FilterControls({ filters, onFilterChange }: FilterControlsProps) {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
    return;
  }

  return (
    <div>
      <select
        className="form-select"
        value={filters.status}
        name="status"
        onChange={handleChange}
      >
        <option value="all">All Statuses</option>
        <option value={ReportStatus.Found}>Found</option>
        <option value={ReportStatus.Lost}>Lost</option>
      </select>

      <select
        className="form-select"
        value={filters.animalType}
        name="animalType"
        onChange={handleChange}
      >
        <option value="all">All Types</option>
        <option value={AnimalType.Dog}>Dog</option>
        <option value={AnimalType.Cat}>Cat</option>
        <option value={AnimalType.Bunny}>Bunny</option>
        <option value={AnimalType.Bird}>Bird</option>
        <option value={AnimalType.Other}>Other</option>
      </select>
    </div>
  );
}

export default FilterControls;
