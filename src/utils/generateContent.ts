import { Buffer } from "buffer";

export const generateContent = (file: File, buffer: Buffer) => {
  if (!file || !buffer) return false;

  const ext = file.name.split('.').pop();
  const mimeType = ext ? `image/${ext}` : "application/octet-stream";
  const base64 = buffer.toString("base64");

  return `data:${mimeType};base64,${base64}`;
};
