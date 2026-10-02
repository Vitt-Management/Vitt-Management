import "server-only";

export interface ImageKitUploadResult {
  url: string;
  fileId: string;
  name: string;
}

export async function uploadToImageKit(
  file: File,
  folder = "/vitt-assets"
): Promise<ImageKitUploadResult> {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("IMAGEKIT_PRIVATE_KEY is not configured in .env");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", file.name || `img-${Date.now()}`);
  formData.append("folder", folder);
  formData.append("useUniqueFileName", "true");

  const authHeader = "Basic " + Buffer.from(privateKey + ":").toString("base64");

  const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
    method: "POST",
    headers: {
      Authorization: authHeader,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "ImageKit upload failed.");
  }

  return {
    url: data.url,
    fileId: data.fileId,
    name: data.name,
  };
}
