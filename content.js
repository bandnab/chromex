chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'scrapeConnections') {
      console.log('Content script received scrape request');
      const data = scrapeConnections();
      sendResponse(data);
    }
  });
  
  function scrapeConnections() {
    console.log('Scraping connections...');
    
    // Adjust the selector to match the LinkedIn connections page structure
    const connections = document.querySelectorAll('.mn-connection-card__details');
    console.log(`Found ${connections.length} connections.`);
    
    const data = Array.from(connections).map(connection => {
      const nameElement = connection.querySelector('.mn-connection-card__name');
      const headingElement = connection.querySelector('.mn-connection-card__occupation');
      const locationElement = connection.querySelector('.mn-connection-card__location');
  
      return {
        firstName: nameElement ? nameElement.textContent.trim().split(' ')[0] : '',
        lastName: nameElement ? nameElement.textContent.trim().split(' ').slice(1).join(' ') : '',
        heading: headingElement ? headingElement.textContent.trim() : '',
        location: locationElement ? locationElement.textContent.trim() : ''
      };
    });
  
    console.log('Scraped data:', data);
    return data;
  }
  