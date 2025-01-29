# Time.com Latest Stories API

A lightweight Node.js API that fetches and returns the latest stories from Time.com's homepage in a clean JSON format. This project demonstrates basic web scraping and API development skills while maintaining simplicity and efficiency.

## Features

- Fetches the 6 latest stories from Time.com
- Returns clean JSON data with story titles and links
- Minimal dependencies (only Express.js required)
- Error handling for failed requests
- User-agent spoofing to prevent blocking

## Prerequisites

Before running this project, make sure you have:

- Node.js (v12 or higher) installed
- npm (Node Package Manager)
- Basic knowledge of REST APIs
- Internet connection to access Time.com

## Installation

1. Clone this repository or create a new directory:

```bash
mkdir time-stories-api
cd time-stories-api
```

2. Initialize a new Node.js project:

```bash
npm init -y
```

3. Install the required dependency:

```bash
npm install express
```

4. Create a new file named `server.js` and copy the provided code into it.

## Usage

1. Start the server:

```bash
node server.js
```

2. The server will start running on port 80 (make sure this port is available)

3. Access the API endpoint:

```bash
curl http://localhost/getTimeStories
```

### Sample Response

```json
[
  {
    "title": "Example Story Title",
    "link": "https://time.com/example-story-path"
  },
  {
    "title": "Another Story Title",
    "link": "https://time.com/another-story-path"
  }
]
```

## Code Structure

- `server.js`: Main application file containing all the logic
- Key functions:
  - `fetchHtml()`: Retrieves HTML content from Time.com
  - `parseStories()`: Extracts story information from HTML
  - `extractHref()`: Pulls link URLs from HTML elements
  - `extractTitle()`: Extracts and cleans story titles

## Technical Choices

1. **Express.js**: Chosen for its simplicity and widespread use in Node.js applications
2. **Native https module**: Used instead of axios/fetch to minimize dependencies
3. **String operations**: Utilized for parsing instead of DOM libraries to keep the code lightweight
4. **Promise-based architecture**: Ensures clean handling of asynchronous operations

## Error Handling

The API includes basic error handling:

- Network request failures
- HTML parsing errors
- Invalid responses from Time.com

All errors are returned with appropriate HTTP 500 status codes and error messages.
