/**
 * User animal report form
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimalType, type ReportFormData } from "../types";

function ReportForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ReportFormData>({
    animalName: "",
    animalType: AnimalType.Dog,
    photo: null,
    desc: "",
    contactInfo: "",
    location: null,
    password: "",
  });

  // form fields are changed
  function handleInputChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ): void {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <div className="container mt-4">
      <h2>Report a Lost Pet</h2>

      <form>
        <div className="mb-3">
          <label className="form-label">Animal Name</label>
          <input
            type="text"
            className="form-control"
            name="animalName"
            value={formData.animalName}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Animal Type</label>
          <select
            className="form-select"
            name="animalType"
            value={formData.animalType}
            onChange={handleInputChange}
          >
            <option value={AnimalType.Dog}>Dog</option>
            <option value={AnimalType.Cat}>Cat</option>
            <option value={AnimalType.Bird}>Bird</option>
            <option value={AnimalType.Bunny}>Bunny</option>
            <option value={AnimalType.Other}>Other</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Photo</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="desc"
            value={formData.desc || ""}
            rows={3}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contact Information</label>
          <input
            type="text"
            className="form-control"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleInputChange}
            placeholder="Phone number or email"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Last Seen Location (click on map)
          </label>
        </div>

        <div className="mb-3">
          <label className="form-label">
            Password (to mark as found later)
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="btn btn-primary"></button>
      </form>
    </div>
  );
}

export default ReportForm;
