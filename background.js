const CONFIG = {
  API_TIMEOUT: 10000,
  APP_ID: 'EVEKW57V7X'
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'wolframQuery') {
    handleWolframQuery(request.input)
      .then(result => sendResponse({ result }))
      .catch(error => sendResponse({ result: `Error: ${error.message}` }));
    return true;
  }
});

async function handleWolframQuery(input) {
  const encodedInput = encodeURIComponent(input);
  const url = `https://api.wolframalpha.com/v1/result?appid=${CONFIG.APP_ID}&i=${encodedInput}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CONFIG.API_TIMEOUT);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      if (response.status === 501) {
        throw new Error('Expression format not recognized. Try rephrasing in plain English.');
      } else if (response.status === 400) {
        throw new Error('Invalid input format');
      } else {
        throw new Error(`API returned status ${response.status}`);
      }
    }
    
    const data = await response.text();
    
    if (!data || data.trim() === '') {
      throw new Error('No result returned. Try rephrasing your query.');
    }
    
    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.');
    }
    
    throw error;
  }
}
