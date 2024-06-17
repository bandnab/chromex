# LinkedIn Connection Scraper

## Overview

The LinkedIn Connection Scraper is a Chrome extension that allows you to scrape your LinkedIn connections, capturing details such as first name, last name, profile heading, and location. The collected data can be downloaded as a CSV file for further analysis.

## Features

- Scrape LinkedIn connections
- Collect details: first name, last name, profile heading, and location
- Download the scraped data as a CSV file

## Installation

1. **Clone the repository to your local machine:**
    ```bash
    git clone <repository-url>
    ```

2. **Open the Chrome browser and navigate to `chrome://extensions/`.**

3. **Enable Developer mode by toggling the switch in the top right corner.**

4. **Click on the "Load unpacked" button and select the directory where you cloned the repository.**

## Usage

1. **Open LinkedIn and navigate to your connections page.**

2. **Click on the LinkedIn Connection Scraper extension icon in your Chrome toolbar.**

3. **Click the "Scrape Connections" button to start scraping your connections.**

4. **Once the scraping is complete, click the "Download Data" button to download the scraped data as a CSV file.**

## Files

- `manifest.json`: Defines the extension's metadata and permissions.
- `popup.html`: The HTML file for the extension's popup UI.
- `popup.js`: The JavaScript file containing the logic for scraping connections and downloading data.
- `content.js`: The JavaScript file that runs in the context of LinkedIn pages to extract data.
- `background.js`: The JavaScript file to handle background processes such as creating context menus.
- `scrape.js`: The JavaScript file that handles scraping of LinkedIn connections.
- `profile.js`: The JavaScript file that handles scraping of individual LinkedIn profile locations.

