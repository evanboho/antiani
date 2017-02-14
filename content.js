(function() {
  let enabled = true;

  const stopGifs = function() {
    if (!enabled) return;

    const iframes = document.getElementsByTagName('iframe');

    for (let i = 0; i < iframes.length; i++) {
      const iframe = iframes[i];
      const video = iframe.contentDocument.getElementsByTagName('video');
      video && video[0] && video[0].pause && video[0].pause();
    }
  }

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message.match(/fetchenabled/i)) {
      return sendResponse({ enabled });
    }
    enabled = !!request.message.match(/enabled/);
  });

  setInterval(stopGifs, 100);
})();
