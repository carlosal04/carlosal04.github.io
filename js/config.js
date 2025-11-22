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
    email: 'info@basaltosyagregados.com',
    phone: '+52 993 177 2142',
    whatsapp: '+52 993 177 2142',
    address: {
      street: 'PERIFÉRICO ARCO NORESTE S/N',
      colony: 'COL. CASA BLANCA',
      city: 'Villahermosa',
      state: 'Tabasco',
      postalCode: '86060',
      country: 'México'
    }
  },
  
  // Social Media
  social: {
    facebook: 'https://www.facebook.com/people/Basaltos-Concretos/100083079552720/',
    instagram: 'https://www.instagram.com/basaltosyagregados',
    linkedin: 'https://mx.linkedin.com/company/basaltos-y-agregados',
    // Add more social media links as needed
  },
  
  // Google Maps Embed
  googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241613.00553957842!2d-92.92814!3d17.98923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85edd7f58c3e3197%3A0x58a6b7e508ca2b84!2sVillahermosa%2C%20Tabasco%2C%20Mexico!5e0!3m2!1sen!2smx!4v1700000000000!5m2!1sen!2smx',
  
  // Business Hours (from Facebook page)
  businessHours: {
    weekdays: 'Monday - Friday: 7:00 AM - 5:00 PM',
    saturday: 'Saturday: 7:00 AM - 1:00 PM',
    sunday: 'Sunday: CLOSED'
  },
  
  // SEO Images (relative to site root)
  images: {
    logo: '/images/main-logo.png',
    ogImage: '/images/main-slider.jpg',
    favicon: '/images/favicon.png'
  },
  
  // Form Configuration
  // Web3Forms API Configuration
  // Get your access key from https://web3forms.com
  // Different keys for development and production environments
  forms: {
    web3forms: {
      // Development access key (for testing on localhost or staging)
      accessKeyDev: 'YOUR_DEV_WEB3FORMS_ACCESS_KEY_HERE',
      // Production access key (for live website)
      accessKeyProd: 'YOUR_PROD_WEB3FORMS_ACCESS_KEY_HERE'
    }
  },
  
  // Environment detection
  // Returns 'development' if running on localhost, otherwise 'production'
  getEnvironment: function() {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.includes('192.168.')) {
      return 'development';
    }
    return 'production';
  },
  
  // Get the appropriate access key based on environment
  getWeb3FormsKey: function() {
    const env = this.getEnvironment();
    const key = env === 'development' 
      ? this.forms.web3forms.accessKeyDev 
      : this.forms.web3forms.accessKeyProd;
    
    return key;
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
