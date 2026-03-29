// Interfaces for returned JSON objects from our API's

import type { AnimalReport } from "./report";

export interface JSONBinFetchRes {
  records: {
    reports: AnimalReport[];
  }
  metadata: {
    id: string;
    private: boolean;
    createdAt: string;
    name: string;
  };
}

// Interface for updates (PUT)
export interface JSONBinUpdateRes {
  records: {
    reports: AnimalReport[];
  }
  metadata: {
    parentId: string;
    private: boolean;
  };
}

export interface ImgBBUploadRes {
  data: {
    id: string;
    title: string;
    url_viewer: string;
    url: string;
    display_url: string;
    width: number;
    height: number;
    size: number;
    time: number;
    expiration: number;
    image: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    thumb: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    medium: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    delete_url: string;
  };
  success: boolean;
  status: number;
}

export interface NominatimReverseGeocodeRes {
  display_name: string; // always present, the only one you actually use
  place_id?: number;
  licence?: string;
  osm_type?: string;
  osm_id?: number;
  lat?: string;
  lon?: string;
  class?: string;
  type?: string;
  place_rank?: number;
  importance?: number;
  addresstype?: string;
  name?: string;
  address?: {
    [key: string]: string;
  };
  boundingbox?: [string, string, string, string];
}