document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('scrape').addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'scrapeConnections' }, (response) => {
          if (response && response.success) {
            const connections = response.connections;
            let index = 0;
  
            const scrapeNextProfile = () => {
              if (index < connections.length) {
                const connection = connections[index];
                chrome.tabs.create({ url: connection.profileUrl, active: false }, (tab) => {
                  chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
                    if (tabId === tab.id && changeInfo.status === 'complete') {
                      chrome.tabs.sendMessage(tab.id, { action: 'scrapeLocation' }, (response) => {
                        if (chrome.runtime.lastError) {
                          console.error("chrome.runtime.lastError:", chrome.runtime.lastError.message);
                          connection.location = 'undefined';
                        } else if (!response || !response.location) {
                          console.error("Response or location is undefined:", response);
                          connection.location = 'undefined';
                        } else {
                          connection.location = response.location;
                        }
                        chrome.tabs.remove(tab.id);
                        index++;
                        scrapeNextProfile();
                      });
                      chrome.tabs.onUpdated.removeListener(listener);
                    }
                  });
                });
              } else {
                chrome.storage.local.set({ connections: connections }, () => {
                  console.log('All locations scraped', connections);
                  displayData(connections);
                });
              }
            };
  
            scrapeNextProfile();
          }
        });
      });
    });
  
    document.getElementById('download').addEventListener('click', () => {
      chrome.storage.local.get(['connections'], (result) => {
        const data = result.connections || [];
        const headers = 'First Name,Last Name,Profile Heading,Location\n';
        const csv = headers + data.map(row => `"${row.firstName}","${row.lastName}","${row.profileHeading}","${row.location}"`).join('\n');
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
  });
  