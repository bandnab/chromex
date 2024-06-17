chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'scrapeConnections') {
      const connections = [];
      document.querySelectorAll('.mn-connection-card').forEach(card => {
        const nameElement = card.querySelector('.mn-connection-card__name');
        const nameText = nameElement ? nameElement.innerText : '';
        const profileHeadingElement = card.querySelector('.mn-connection-card__occupation');
        const profileHeadingText = profileHeadingElement ? profileHeadingElement.innerText : '';
        const profileUrlElement = card.querySelector('a[data-control-name="connection_profile"]');
        const profileUrl = profileUrlElement ? profileUrlElement.href : '';
  
        console.log("nameElement:", nameElement);
        console.log("profileHeadingElement:", profileHeadingElement);
        console.log("profileUrlElement:", profileUrlElement);
  
        // Adjust name and profile heading
        let firstName = '';
        let lastName = '';
        let profileHeading = profileHeadingText;
  
        // Split name and handle cases with credentials
        if (nameText.includes(',')) {
          const nameParts = nameText.split(',');
          firstName = nameParts[0].split(' ')[0];
          lastName = nameParts[0].split(' ').slice(1).join(' ');
          profileHeading = `${nameParts.slice(1).join(',')} | ${profileHeadingText}`;
        } else {
          firstName = nameText.split(' ')[0];
          lastName = nameText.split(' ').slice(1).join(' ');
        }
  
        connections.push({ firstName, lastName, profileHeading, profileUrl });
      });
      chrome.storage.local.set({ connections: connections }, () => {
        console.log('Connections saved', connections);
        sendResponse({ success: true, connections: connections });
      });
    }
    return true; // Indicates that the response will be sent asynchronously
  });
  
  