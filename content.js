chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'scrapeConnections') {
      const connections = [];
      document.querySelectorAll('.mn-connection-card').forEach(card => {
        const nameElement = card.querySelector('.mn-connection-card__name');
        const firstName = nameElement ? nameElement.innerText.split(' ')[0] : '';
        const lastName = nameElement ? nameElement.innerText.split(' ').slice(1).join(' ') : '';
        const profileHeading = card.querySelector('.mn-connection-card__occupation')?.innerText || '';
        const locationElement = card.querySelector('.mn-connection-card__location');
        const location = locationElement ? locationElement.innerText : '';
  
        connections.push({ firstName, lastName, profileHeading, location });
      });
      chrome.storage.local.set({ connections: connections }, () => {
        console.log('Connections saved', connections);
        sendResponse({ success: true, connections: connections });
      });
    }
    return true; // Indicates that the response will be sent asynchronously
  });
  