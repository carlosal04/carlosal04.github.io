/* Website Configuration
 * This file contains all configurable website settings
 * Edit these values to customize your site without changing multiple files
 */

const siteConfig = {
  // Base URL - Change this to your actual domain
  // For local development: use '' (empty string) or 'http://localhost:8080'
  // For production: use 'https://www.basaltosyagregados.com' or '' for relative URLs
  baseUrl: '',
  
  // Site Information
  siteName: 'Basaltos & Agregados',
  siteDescription: 'Leading construction and engineering company specializing in paving, bridges, urbanization, and building installations.',
  
  // Contact Information (from Facebook page)
  contact: {
    email: 'basaltosconcretos@hotmail.com',
    phone: '+52 998 147 3817',
    whatsapp: '+52 998 147 3817',
    address: {
      street: 'Carretera Tulum - Cobá km 2.5',
      city: 'Tulum',
      state: 'Quintana Roo',
      postalCode: '77760',
      country: 'México'
    }
  },
  
  // Social Media
  social: {
    facebook: 'https://www.facebook.com/people/Basaltos-Concretos/100083079552720/',
    instagram: 'https://www.instagram.com/basaltosyagregados',
    // Add more social media links as needed
  },
  
  // Google Maps Embed
  googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.3!2d-87.4628!3d20.2114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDEyJzQxLjAiTiA4N8KwMjcnNDYuMSJX!5e0!3m2!1sen!2smx!4v1234567890123!5m2!1sen!2smx',
  
  // Business Hours
  businessHours: {
    weekdays: 'Monday - Friday: 8:00 AM - 6:00 PM',
    saturday: 'Saturday: 9:00 AM - 2:00 PM',
    sunday: 'Sunday: Closed'
  },
  
  // SEO Images (relative to site root)
  images: {
    logo: '/images/main-logo.png',
    ogImage: '/images/main-slider.jpg',
    favicon: '/images/favicon.png'
  }
};

// Helper function to get full URL
function getFullUrl(path) {
  if (!path) return siteConfig.baseUrl;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return siteConfig.baseUrl + path;
}

// Helper function to get image URL
function getImageUrl(imagePath) {
  return getFullUrl(imagePath);
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { siteConfig, getFullUrl, getImageUrl };
}
