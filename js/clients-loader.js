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
      
      clientCard.innerHTML = `
        <div class="client-logo">
          <img src="${client.logo}" alt="${client.name}" loading="lazy">
        </div>
        <p class="client-description">${description}</p>
      `;
      clientsGrid.appendChild(clientCard);
    });
  } catch (error) {
    console.error('Error loading clients:', error);
    // Fallback to showing placeholder message
    const clientsGrid = document.getElementById('clients-grid');
    if (clientsGrid) {
      const currentLang = getCurrentLanguage();
      const messages = {
        en: 'Our clients information will be available soon.',
        es: 'La información de nuestros clientes estará disponible próximamente.',
        cn: '我们的客户信息即将推出。'
      };
      clientsGrid.innerHTML = `<p style="text-align: center; grid-column: 1 / -1;">${messages[currentLang] || messages.en}</p>`;
    }
  }
}

// Load clients when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadClients);
} else {
  loadClients();
}
