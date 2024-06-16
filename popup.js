document.getElementById('scrape').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'scrapeConnections' }, (response) => {
        if (response && response.success) {
          displayData(response.connections);
        }
      });
    });
  });
  
  document.getElementById('download').addEventListener('click', () => {
    chrome.storage.local.get(['connections'], (result) => {
      const data = result.connections || [];
      // Add headers
      const headers = 'First Name,Last Name,Profile Heading,Location\n';
      const csv = headers + data.map(row => `${row.firstName},${row.lastName},${row.profileHeading},${row.location}`).join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'connections.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  });
  
  function displayData(connections) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<ul>' + connections.map(conn => `<li>${conn.firstName} ${conn.lastName} - ${conn.profileHeading} (${conn.location})</li>`).join('') + '</ul>';
  }
  