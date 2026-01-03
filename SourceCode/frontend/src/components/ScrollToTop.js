import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop Component
 * * This component listens to the current URL path. Whenever the user 
 * navigates to a new route, it forces the window to jump back to 
 * the top (0,0) coordinates immediately.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    try {
      // Force the scroll to the top left of the document
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant", // Disables smooth scrolling to ensure it's at the top before the user sees content
      });
    } catch (error) {
      // Fallback for older browsers that don't support the scroll options object
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}