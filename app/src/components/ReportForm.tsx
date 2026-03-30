/**
 * User animal report form
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimalType, ReportStatus, type ReportFormData } from "../types";
import { reverseGeocode, saveReport, uploadImage, hashPassword } from "../services";
import LocationPicker from "./LocationPicker";

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
    <section className="container mt-4">
      <h2>Report a Lost Pet</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Pet Name */}
      <form onSubmit={handleSubmit}>
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
          <LocationPicker onLocationSelection={handleLocationSelect} />

          {/* If addressPreview is falsy then dont render this */}
          {addressPreview ? (
            <div className="mt-2 text-muted">
              <strong>Selected Address:</strong> {addressPreview}
            </div>
          ) : null}
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

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Submitting..." : "Submit Report"}
        </button>
      </form>
    </section>
  );
}

export default ReportForm;
