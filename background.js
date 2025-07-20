chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'wolframQuery') {
    const appId = 'EVEKW57V7X';
    const encodedInput = encodeURIComponent(request.input);
    const url = `https://api.wolframalpha.com/v1/result?appid=${appId}&i=${encodedInput}`;

    fetch(url)
      .then(res => res.text())
      .then(data => sendResponse({ result: data }))
      .catch(err => sendResponse({ result: 'Error: ' + err.message }));

    return true;
  }
});