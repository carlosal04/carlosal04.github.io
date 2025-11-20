/* Services Loader - Dynamically load services from JSON with multi-language support */

// Detect current language from URL path
function getCurrentLanguage() {
  const path = window.location.pathname;
  if (path.startsWith('/en/')) return 'en';
  if (path.startsWith('/cn/')) return 'zh';
  // Spanish is the default (root path)
  return 'es';
}

async function loadServices() {
  try {
    const response = await fetch('/data/services.json');
    const data = await response.json();
    
    const servicesGrid = document.getElementById('services-grid');
    if (!servicesGrid) return;
    
    const currentLang = getCurrentLanguage();
    servicesGrid.innerHTML = '';
    
    data.services.forEach(service => {
      const serviceCard = document.createElement('article');
      serviceCard.className = 'service-card';
      
      // Create icon element
      const iconDiv = document.createElement('div');
      iconDiv.className = 'service-icon';
      iconDiv.textContent = service.icon;
      
      // Create title
      const title = document.createElement('h3');
      title.textContent = service.title[currentLang] || service.title.en;
      
      // Create description
      const description = document.createElement('p');
      description.textContent = service.description[currentLang] || service.description.en;
      
      // Append elements
      serviceCard.appendChild(iconDiv);
      serviceCard.appendChild(title);
      serviceCard.appendChild(description);
      servicesGrid.appendChild(serviceCard);
    });
  } catch (error) {
    // Fallback to showing placeholder message
    const servicesGrid = document.getElementById('services-grid');
    if (servicesGrid) {
      const currentLang = getCurrentLanguage();
      const messages = {
        en: 'Services information will be available soon.',
        es: 'La información de servicios estará disponible próximamente.',
        zh: '服务信息即将推出。'
      };
      
      const errorP = document.createElement('p');
      errorP.style.textAlign = 'center';
      errorP.style.gridColumn = '1 / -1';
      errorP.textContent = messages[currentLang] || messages.es;
      
      servicesGrid.innerHTML = '';
      servicesGrid.appendChild(errorP);
    }
  }
}

// Load services when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadServices);
} else {
  loadServices();
}
