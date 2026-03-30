// API service for IMG BB uploads

import type { ImgBBUploadRes } from "../types";

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

export async function uploadImage(file: File): Promise<string> {
  if (!IMGBB_API_KEY) {
    throw new Error("ImgBB API key is not configured");
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to upload image: ${errorText}`);
  }

  const data: ImgBBUploadRes = await response.json();

  if (!data.success) {
    throw new Error("Image upload failed");
  }

  return data.data.display_url;
}
