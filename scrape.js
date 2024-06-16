(function() {
    const connections = [];
    document.querySelectorAll('.mn-connection-card').forEach(card => {
      const firstName = card.querySelector('.mn-connection-card__name').innerText.split(' ')[0];
      const lastName = card.querySelector('.mn-connection-card__name').innerText.split(' ').slice(1).join(' ');
      const profileHeading = card.querySelector('.mn-connection-card__occupation').innerText;
      const location = card.querySelector('.mn-connection-card__location').innerText;
      connections.push([firstName, lastName, profileHeading, location]);
    });
    chrome.storage.local.set({ connections: connections }, function() {
      console.log('Connections saved');
    });
  })();
  