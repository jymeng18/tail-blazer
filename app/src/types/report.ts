import { AnimalType, ReportStatus } from "./enums";

interface Location {
  lat: number;
  lon: number;
  address: string;
}

export interface AnimalReport {
  id: string;
  animalName: string;
  animalType: AnimalType;
  animalPhotoURL: string;
  desc: string | null;
  contactInfo: string;
  location: Location | null;
  passwordHash: string;
  status: ReportStatus;
  createdAt: string;
}

export interface ReportFormData {
  animalName: string;
  animalType: AnimalType;
  photo: File | null;
  desc: string | null;
  contactInfo: string;
  location: Location | null;
  password: string;
}