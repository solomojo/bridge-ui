var changeListenerPool;
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  switch (message.action) {
    case 'windowsCreate':
      var url = message.url + '&ltkwindow=1&parentId=' + sender.tab.id;
      closeFrame();
      createWindow(url, sendResponse);
      break;
    case 'storageSet':
      chrome.storage.local.set(request.data, sendResponse);
      break;
    case 'storageGet':
      chrome.storage.local.get(request.data, sendResponse);
      break;
    case 'storageRemove':
      chrome.storage.local.remove(request.data, sendResponse);
      break;
    case 'storageClear':
      chrome.storage.local.clear(sendResponse);
      break;
    case 'storageAddListener':
      changeListenerPool.push(request.data.tabMetadata);
      break;
    case 'backgroundPin':
      chrome.windows.remove(message.windowId);
      pinFrame(message.tabId, message.url);
      break;
    case 'closeFrame':
      closeFrame();
      break;
  }
  return true; // necessary to sendResponse asynchronously
});

chrome.browserAction.onClicked.addListener(function () {
  if (!chrome.storage.sync) {
    chrome.storage.sync = chrome.storage.local;
  }
  chrome.storage.sync.get({ 'openNewWindow': false }, function (data) {
    if (data.openNewWindow === true) {
      openNewWindow();
    } else {
      openFrame();
    }
  });
});

function openFrame() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log(tabs);
    pinFrame(tabs[0].id, tabs[0].url);
  });
}

function pinFrame(tabId, tabURL) {
  chrome.tabs.sendMessage(tabId, { action: "pin", sourceURL: tabURL }, function (response) {
    if (!response) {
      // In case the extension is refreshed and looses track of the page to attach to
      chrome.tabs.reload(tabId);
      openNewWindow();
    }
  });
}

function closeFrame() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { sourceURL: tabs[0].url, action: 'removeFrame' });
  });
}

function openNewWindow() {
  chrome.tabs.query({ active: true }, function (tabs) {
    var url = chrome.extension.getURL('popup/popup.html') + '?srcUrl=' + tabs[0].url + '&ltkwindow=1&parentId=' + tabs[0].id;
    createWindow(url);
  });
}

function createWindow(url) {
  chrome.windows.create({
    url: url,
    type: 'popup',
    width: 500,
    height: 625,
    top: 0
  });
}
