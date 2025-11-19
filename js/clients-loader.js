/* Client Loader - Dynamically load clients from JSON with multi-language support */

// Detect current language from URL path
function getCurrentLanguage() {
  const path = window.location.pathname;
  if (path.startsWith('/en/')) return 'en';
  if (path.startsWith('/cn/')) return 'cn';
  // Spanish is the default (root path)
  return 'es';
}

async function loadClients() {
  try {
    const response = await fetch('/data/clients.json');
    const data = await response.json();
    
    const clientsGrid = document.getElementById('clients-grid');
    if (!clientsGrid) return;
    
    const currentLang = getCurrentLanguage();
    clientsGrid.innerHTML = '';
    
    data.clients.forEach(client => {
      const clientCard = document.createElement('div');
      clientCard.className = 'client-card';
      
      // Get description in current language, fallback to English
      const description = typeof client.description === 'object' 
        ? (client.description[currentLang] || client.description.en || '')
        : client.description;
      
      // Create logo container
      const logoDiv = document.createElement('div');
      logoDiv.className = 'client-logo';
      
      // Create and configure image element securely
      const img = document.createElement('img');
      img.src = client.logo;
      img.alt = client.name;
      img.loading = 'lazy';
      logoDiv.appendChild(img);
      
      // Create description paragraph securely
      const descP = document.createElement('p');
      descP.className = 'client-description';
      descP.textContent = description;
      
      // Append elements to card
      clientCard.appendChild(logoDiv);
      clientCard.appendChild(descP);
      clientsGrid.appendChild(clientCard);
    });
  } catch (error) {
    // Fallback to showing placeholder message
    const clientsGrid = document.getElementById('clients-grid');
    if (clientsGrid) {
      const currentLang = getCurrentLanguage();
      const messages = {
        en: 'Our clients information will be available soon.',
        es: 'La información de nuestros clientes estará disponible próximamente.',
        cn: '我们的客户信息即将推出。'
      };
      
      // Create error message element securely
      const errorP = document.createElement('p');
      errorP.style.textAlign = 'center';
      errorP.style.gridColumn = '1 / -1';
      errorP.textContent = messages[currentLang] || messages.en;
      
      clientsGrid.innerHTML = '';
      clientsGrid.appendChild(errorP);
    }
  }
}

// Load clients when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadClients);
} else {
  loadClients();
}
