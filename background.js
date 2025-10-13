// Configuration constants
const CONFIG = {
  WOLFRAM_APP_ID: 'EVEKW57V7X',
  API_TIMEOUT: 10000 // 10 seconds
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'wolframQuery') {
    handleWolframQuery(request.input)
      .then(result => sendResponse({ result }))
      .catch(error => sendResponse({ result: `Error: ${error.message}` }));
    
    return true; // Keep message channel open for async response
  }
});

async function handleWolframQuery(input) {
  if (!input || !input.trim()) {
    throw new Error('Empty input');
  }

  const encodedInput = encodeURIComponent(input);
  const url = `https://api.wolframalpha.com/v1/result?appid=${CONFIG.WOLFRAM_APP_ID}&i=${encodedInput}`;

  try {
    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CONFIG.API_TIMEOUT);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 501) {
        throw new Error('Unable to understand input');
      }
      throw new Error(`Server error (${response.status})`);
    }

    const data = await response.text();
    
    if (!data || data.trim() === '') {
      throw new Error('Empty response from server');
    }

    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - please try again');
    }
    throw error;
  }
}