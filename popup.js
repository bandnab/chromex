document.getElementById('scrapeBtn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log('Executing content script...');
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['content.js']
      }, () => {
        console.log('Content script executed.');
        chrome.tabs.sendMessage(tabs[0].id, { action: 'scrapeConnections' }, (response) => {
          if (chrome.runtime.lastError) {
            console.error('Error:', chrome.runtime.lastError.message);
            document.getElementById('status').textContent = "Error accessing the page content.";
          } else {
            console.log('Received response:', response);
            const data = response;
            if (data && data.length > 0) {
              displayData(data);
            } else {
              document.getElementById('status').textContent = "No connections data found.";
            }
          }
        });
      });
    });
  });
  
  function displayData(data) {
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = `${data.length} connections scraped`;
  
    const resultDiv = document.getElementById('result');
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    ['First Name', 'Last Name', 'Heading', 'Location'].forEach(headerText => {
      const header = document.createElement('th');
      header.textContent = headerText;
      headerRow.appendChild(header);
    });
    table.appendChild(headerRow);
  
    data.forEach(connection => {
      const row = document.createElement('tr');
      ['firstName', 'lastName', 'heading', 'location'].forEach(field => {
        const cell = document.createElement('td');
        cell.textContent = connection[field];
        row.appendChild(cell);
      });
      table.appendChild(row);
    });
  
    resultDiv.innerHTML = '';
    resultDiv.appendChild(table);
  }
  