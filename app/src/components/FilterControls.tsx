/**
 * Filter controls for the list view
 */

import type React from "react";
import "../styles/FilterControls.css";
import { AnimalType, ReportStatus } from "../types";

interface FilterControlsProps {
  filters: { animalType: string; status: string };
  onFilterChange: (filters: { animalType: string; status: string }) => void;
}

function FilterControls({ filters, onFilterChange }: FilterControlsProps) {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  }

  return (
    <div className="filter-controls">
      <div className="filter-group">
        <label>Status</label>
        <select
          value={filters.status}
          name="status"
          onChange={handleChange}
        >
          <option value="all">All Statuses</option>
          <option value={ReportStatus.Found}>Found</option>
          <option value={ReportStatus.Lost}>Lost</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Animal Type</label>
        <select
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
    </div>
  );
}

export default FilterControls;
