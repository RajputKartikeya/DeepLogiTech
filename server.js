const express = require("express");
const https = require("https");

const app = express();
const PORT = 80;

app.get("/getTimeStories", async (req, res) => {
  try {
    const html = await fetchHtml("https://time.com");
    const stories = parseStories(html);

    res.json(stories.slice(0, 6));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Fetch HTML content
function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (response) => {
        let data = "";
        response.on("data", (chunk) => (data += chunk));
        response.on("end", () => resolve(data));
      })
      .on("error", reject);
  });
}

// Parse stories from HTML
function parseStories(html) {
  const stories = [];
  const splitMarker = '<li class="latest-stories__item">';
  const parts = html.split(splitMarker).slice(1); // Skip first irrelevant part

  for (const part of parts) {
    const href = extractHref(part);
    const title = extractTitle(part);
    if (href && title) {
      stories.push({ title, link: `https://time.com${href}` });
    }
  }

  return stories;
}

// Extract href attribute
function extractHref(htmlPart) {
  const hrefMatch = htmlPart.match(/<a href="([^"]+)/);
  return hrefMatch ? hrefMatch[1] : "";
}

// Extract title text
function extractTitle(htmlPart) {
  const titleMatch = htmlPart.match(/<a [^>]*>([\s\S]*?)<\/a>/);
  if (!titleMatch) return "";
  return titleMatch[1].replace(/<[^>]+>/g, "").trim();
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
