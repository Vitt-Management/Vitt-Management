"use server";

import { uploadToImageKit } from "@/lib/imagekit";

export async function uploadImageAction(formData: FormData): Promise<{ ok: boolean; url?: string; error?: string }> {
  try {
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "/vitt-assets";

    if (!file || file.size === 0) {
      return { ok: false, error: "No image file provided." };
    }

    if (file.size > 10 * 1024 * 1024) {
      return { ok: false, error: "File size exceeds 10MB limit." };
    }

    const result = await uploadToImageKit(file, folder);
    return { ok: true, url: result.url };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to upload image to ImageKit.";
    console.error("ImageKit upload error:", message);
    return { ok: false, error: message };
  }
}
