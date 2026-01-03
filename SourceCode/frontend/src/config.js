// Base URL for images (adjust if your backend serves images differently)
const BASE_IMAGE_URL = "http://localhost:8080/images/";

// Resolve image URL safely
export const resolveImageUrl = (path) => {
  if (!path) return "https://via.placeholder.com/300x400?text=No+Image"; // fallback
  if (path.startsWith("http")) return path; // already a full URL
  return `${BASE_IMAGE_URL}${path}`; // prepend base URL
};