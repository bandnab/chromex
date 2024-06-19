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
  
        let firstName = '';
        let lastName = '';
        let profileHeading = profileHeadingText;
  
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
    } else if (request.action === 'scrapeLocation') {
      const locationElement = document.querySelector('.text-body-small.inline.t-black--light.break-words');
      const location = locationElement ? locationElement.innerText : 'undefined';
      sendResponse({ location });
    }
    return true; // Keeps the message channel open for sendResponse
  });
  