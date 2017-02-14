(function() {
  let enabled = true;

  function sendMessage(message, cb) {
    const queryInfo = {
      active: true,
      currentWindow: true,
    };

    chrome.tabs.query(queryInfo, function(tabs) {
      const activeTab = tabs[0],
            tabId = activeTab.id;

      chrome.tabs.sendMessage(tabId, { message, tabId }, cb || function() {});
    });
  }

  function setButtonText(text) {
    const button = document.getElementsByTagName('button')[0];
    if (text) {
      return button.textContent = text;
    }
    button.textContent = enabled ? 'Active' : 'Disabled';
    button.className = enabled ? 'enabled' : 'disabled';
  }

  document.addEventListener('DOMContentLoaded', function() {
    sendMessage('fetchEnabled', function(response) {
      if (!response) {
        return setButtonText('Not enabled for this site.');
      }
      enabled = response.enabled;
      setButtonText();
    });
  });

  document.addEventListener('click', function(e) {
    enabled = !enabled;
    setButtonText();
    sendMessage(enabled ? 'enabled' : 'disabled');
  });

})();
