chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: 'scrapeConnections',
      title: 'Scrape LinkedIn Connections',
      contexts: ['all']
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'scrapeConnections') {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
      });
    }
  });
  