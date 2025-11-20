/* Experience Loader - Dynamically load experience areas from JSON with multi-language support */

// Detect current language from URL path
function getCurrentLanguage() {
  const path = window.location.pathname;
  if (path.startsWith('/en/')) return 'en';
  if (path.startsWith('/cn/')) return 'zh';
  // Spanish is the default (root path)
  return 'es';
}

async function loadExperience() {
  try {
    const response = await fetch('/data/experience.json');
    const data = await response.json();
    
    const experienceGrid = document.getElementById('experience-grid');
    if (!experienceGrid) return;
    
    const currentLang = getCurrentLanguage();
    experienceGrid.innerHTML = '';
    
    data.experience.forEach(item => {
      const experienceCard = document.createElement('article');
      experienceCard.className = 'service-card';
      
      // Create icon element
      const iconDiv = document.createElement('div');
      iconDiv.className = 'service-icon';
      iconDiv.textContent = item.icon;
      
      // Create title
      const title = document.createElement('h3');
      title.textContent = item.title[currentLang] || item.title.en;
      
      // Create description
      const description = document.createElement('p');
      description.textContent = item.description[currentLang] || item.description.en;
      
      // Append elements
      experienceCard.appendChild(iconDiv);
      experienceCard.appendChild(title);
      experienceCard.appendChild(description);
      experienceGrid.appendChild(experienceCard);
    });
  } catch (error) {
    // Fallback to showing placeholder message
    const experienceGrid = document.getElementById('experience-grid');
    if (experienceGrid) {
      const currentLang = getCurrentLanguage();
      const messages = {
        en: 'Experience information will be available soon.',
        es: 'La información de experiencia estará disponible próximamente.',
        zh: '经验信息即将推出。'
      };
      
      const errorP = document.createElement('p');
      errorP.style.textAlign = 'center';
      errorP.style.gridColumn = '1 / -1';
      errorP.textContent = messages[currentLang] || messages.es;
      
      experienceGrid.innerHTML = '';
      experienceGrid.appendChild(errorP);
    }
  }
}

// Load experience when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadExperience);
} else {
  loadExperience();
}
