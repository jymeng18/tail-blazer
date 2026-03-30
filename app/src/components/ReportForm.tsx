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

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");

  // form fields are changed
  function handleInputChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ): void {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>,
  ): void {
    const files = e.target.files;

    if(files && files.length > 0){
      setFormData({ ...formData, photo: files[0]});
    }
  }

  return (
    <section className="container mt-4">
      <h2>Report a Lost Pet</h2>

      {/* Pet Name */}
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

        {/* Pet Type */}
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

        {/* Pet Photo */}
        <div className="mb-3">
          <label className="form-label">Photo</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {/* Pet Desc */}
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

        {/* Owner Contact Info */}
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

        {/* Leaflet Map */}
        <div className="mb-3">
          <label className="form-label">
            Last Seen Location (click on map)
          </label>
        </div>

        {/* Password For Post */}
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
    </section>
  );
}

export default ReportForm;
