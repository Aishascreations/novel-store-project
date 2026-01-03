import axios from "axios";

/**
 * Global configuration for Axios.
 * Points to your Spring Boot backend on Port 8080.
 */
const API_BASE_URL = "http://localhost:8080/api/novels";

/**
 * 1. Fetch novels with pagination.
 * Spring Boot expects 0-based indexing for pages.
 */
export const getProductsByPage = async (page = 0, size = 6) => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: { page, size },
    });
    return response.data; // Returns the Page object { content: [], totalPages: x, ... }
  } catch (error) {
    console.error("Error fetching paginated products:", error);
    throw error;
  }
};

/**
 * 2. Fetch a single novel by its ID.
 * Used for the Product Details page.
 */
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null; // Return null so the UI can show a "Not Found" state
  }
};

/**
 * 3. Search novels by title.
 * Connects to the @GetMapping("/search") endpoint in your Controller.
 */
export const searchProducts = async (title) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`, {
      params: { title },
    });
    return response.data; // Returns a List of NovelDTOs
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
};

/**
 * 4. Fetch all novels (Legacy/Internal use).
 * Note: Use getProductsByPage for the Home screen to keep it fast!
 */
export const getAllProducts = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    // If the backend returns a Page object here, we extract the content
    return response.data.content ? response.data.content : response.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
};