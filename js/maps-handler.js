/**
 * Google Maps Error Handler
 * Handles iframe loading errors and displays fallback UI
 */

document.addEventListener('DOMContentLoaded', function() {
  // Find all Google Maps iframes
  const mapIframes = document.querySelectorAll('iframe[src*="google.com/maps"]');
  
  mapIframes.forEach(iframe => {
    // Add error handler via addEventListener
    iframe.addEventListener('error', function() {
      // Hide the iframe
      this.style.display = 'none';
      
      // Show the fallback message (next sibling element)
      const fallback = this.nextElementSibling;
      if (fallback) {
        fallback.style.display = 'block';
      }
    });
    
    // Also check if iframe fails to load within timeout
    const timeout = setTimeout(() => {
      // Check if iframe loaded successfully by checking if it has content
      try {
        if (!iframe.contentWindow || !iframe.src) {
          iframe.dispatchEvent(new Event('error'));
        }
      } catch (e) {
        // Cross-origin restrictions prevent checking, which is normal
        // The onerror handler will catch actual errors
      }
    }, 5000);
    
    // Clear timeout if iframe loads successfully
    iframe.addEventListener('load', () => {
      clearTimeout(timeout);
    });
  });
});
