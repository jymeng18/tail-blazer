/**
 * User animal report form
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimalType, ReportStatus, type ReportFormData } from "../types";
import { reverseGeocode, saveReport, uploadImage, hashPassword } from "../services";
import LocationPicker from "./LocationPicker";
import "../styles/ReportForm.css";

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
  const [addressPreview, setAddressPreview] = useState<string>("");

  // form fields are changed
  function handleInputChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ): void {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const files = e.target.files;

    if (files && files.length > 0) {
      setFormData({ ...formData, photo: files[0] });
    }
  }

  async function handleLocationSelect(lat: number, lng: number): Promise<void> {
    try {
      // reverseGeocode retuns only the address/name of the location
      const address = await reverseGeocode(lat, lng);
      setAddressPreview(address);

      // Update form, location expects Location | null object
      setFormData({
        ...formData,
        location: {
          lat: lat,
          lon: lng,
          address: address,
        },
      });
    } catch {
      setError("Failed to get address for location.");
    }
  }

  // Handle form submission - must be async
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Photo can be optional, not every user has photos of their pet
    if (
      !formData.animalName ||
      !formData.animalType ||
      !formData.contactInfo ||
      !formData.desc ||
      !formData.location ||
      !formData.password
    ) {
      setError("Please fill in all required form fields.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Upload image if provided, otherwise use empty string
      let imgURL = "";
      if (formData.photo) {
        imgURL = await uploadImage(formData.photo);
      }

      // Hash the password before storing
      const hashedPassword = await hashPassword(formData.password);

      // Save report to JSONBin
      await saveReport({
        id: crypto.randomUUID(),
        animalName: formData.animalName,
        animalType: formData.animalType,
        animalPhotoURL: imgURL,
        desc: formData.desc,
        contactInfo: formData.contactInfo,
        location: formData.location,
        passwordHash: hashedPassword,
        status: ReportStatus.Lost,
        createdAt: new Date().toISOString(),
      });

      // Navigate to home page on success
      navigate("/");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to submit report. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="report-form-container">
      <h2>Report a Lost Pet</h2>

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Pet Name */}
        <div className="form-section">
          <label>Animal Name *</label>
          <input
            type="text"
            name="animalName"
            value={formData.animalName}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Pet Type */}
        <div className="form-section">
          <label>Animal Type *</label>
          <select
            name="animalType"
            value={formData.animalType}
            onChange={handleInputChange}
            required
          >
            <option value={AnimalType.Dog}>Dog</option>
            <option value={AnimalType.Cat}>Cat</option>
            <option value={AnimalType.Bird}>Bird</option>
            <option value={AnimalType.Bunny}>Bunny</option>
            <option value={AnimalType.Other}>Other</option>
          </select>
        </div>

        {/* Pet Photo */}
        <div className="form-section">
          <label>Photo (Optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <div className="photo-upload-hint">
            Uploading a photo helps others identify your pet
          </div>
        </div>

        {/* Pet Desc */}
        <div className="form-section">
          <label>Description *</label>
          <textarea
            name="desc"
            value={formData.desc || ""}
            onChange={handleInputChange}
            placeholder="Describe your pet's appearance, behavior, or any distinguishing features..."
            required
          />
        </div>

        {/* Owner Contact Info */}
        <div className="form-section">
          <label>Contact Information *</label>
          <input
            type="text"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleInputChange}
            placeholder="Phone number or email"
            required
          />
        </div>

        {/* Leaflet Map */}
        <div className="form-section">
          <label>Last Seen Location (click on map) *</label>
          <div className="location-picker-wrapper">
            <LocationPicker onLocationSelection={handleLocationSelect} />
          </div>

          {addressPreview && (
            <div className="address-preview">
              <strong>Selected Address:</strong> {addressPreview}
            </div>
          )}
        </div>

        {/* Password For Post */}
        <div className="form-section">
          <label>Password (to mark as found later) *</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Choose a password to manage this report"
            required
          />
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Submitting..." : "Submit Report"}
        </button>
      </form>
    </section>
  );
}

export default ReportForm;
