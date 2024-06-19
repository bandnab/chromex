chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'scrapeLocation') {
      console.log("scrapeLocation action received");
      
      const locationElement = document.querySelector('.text-body-small.inline.t-black--light.break-words');
      console.log("locationElement:", locationElement);
      
      const location = locationElement ? locationElement.innerText : 'Location not found';
      console.log("location:", location);
      
      sendResponse({ location: location });
    }
  });
  
  