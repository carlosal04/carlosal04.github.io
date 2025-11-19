/* Client Loader - Dynamically load clients from JSON */

async function loadClients() {
  try {
    const response = await fetch('/data/clients.json');
    const data = await response.json();
    
    const clientsGrid = document.getElementById('clients-grid');
    if (!clientsGrid) return;
    
    clientsGrid.innerHTML = '';
    
    data.clients.forEach(client => {
      const clientCard = document.createElement('div');
      clientCard.className = 'client-card';
      clientCard.innerHTML = `
        <div class="client-logo">
          <img src="${client.logo}" alt="${client.name}" loading="lazy" onerror="this.src='/images/clients/placeholder.png'">
        </div>
        <p class="client-description">${client.description}</p>
      `;
      clientsGrid.appendChild(clientCard);
    });
  } catch (error) {
    console.error('Error loading clients:', error);
    // Fallback to showing placeholder message
    const clientsGrid = document.getElementById('clients-grid');
    if (clientsGrid) {
      clientsGrid.innerHTML = '<p style="text-align: center; grid-column: 1 / -1;">Our clients information will be available soon.</p>';
    }
  }
}

// Load clients when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadClients);
} else {
  loadClients();
}
