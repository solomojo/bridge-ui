if(chrome.storage === undefined) {
  chrome.storage = new StorageShim();
}
window.ltkbridge = {
  move: false,
  resize: false,
  handleOffset: 50
};
// function resizeFrame(data) {
//   var iframe = document.getElementById('ltkbridge-frame');
//   iframe.width = data.width + 'px';
//   iframe.height = data.height + 'px';
// }
function createIframe(frameId, width, height) {
  var iframe = document.createElement('iframe');
  iframe.src = chrome.extension.getURL("popup/popup.html") + "?srcUrl=" + window.location.href;
  iframe.setAttribute('width', width + 'px');
  iframe.setAttribute('height', height + 'px');
  iframe.id = frameId;
  iframe.style.position = "fixed";
  iframe.style.top = "0";
  iframe.style.left = (document.body.clientWidth - (width + 2) - 15) + 'px';
  iframe.style.zIndex = '2147483635';
  iframe.style.border = "1px solid lightgray";
  iframe.style.borderRadius = "3px";
  iframe.style.overflowX = "hidden";
  iframe.style.boxShadow = "0 2px 10px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.26)";
  return iframe;
}
function createHandle(handleId) {
  var handle = document.createElement('div');
  handle.id = handleId;
  handle.style.width = "290px";
  handle.style.height = "46px";
  handle.style.opacity = 0.0001;
  handle.style.backgroundColor = 'white';
  handle.style.right = (220 - window.ltkbridge.handleOffset) + 'px';
  handle.style.top = "0";
  handle.style.position = 'fixed';
  handle.style.zIndex = '2147483636';
  handle.style.cursor = '-webkit-grab';
  return handle;
}

function removeFrame() {
  var frameId = 'ltkbridge-frame';
  var handleId = 'ltkbridge-handle';

  chrome.storage.local.remove(window.location.host, function() {
    var oldframe = document.getElementById(frameId);
    var oldhandle = document.getElementById(handleId);
    if(oldframe !== null) {
      oldframe.parentElement.removeChild(oldframe);
      oldhandle.parentElement.removeChild(oldhandle);
    }
  });
}

function setupFrame() {
  window.addEventListener("message", function(event) {
    var data = event.data;
    if(event.data === undefined) {return;}
    if(data.url.includes(window.location.host)) {
      switch (data.action) {
        case 'close':
          removeFrame();
          break;
        // case 'resize':
        //   resizeFrame(data);
        //   break;
      }
    }
  }, false);
  var frameId = 'ltkbridge-frame';
  var handleId = 'ltkbridge-handle';
  var iframeHeight = 625;
  var iframeWidth = 498;
  var oldDownFunction = document.onmousedown;
  var oldUpFunction = document.onmouseup;
  var oldMoveFunction = document.onmousemove;
  var oldframe = document.getElementById(frameId);
  var oldHref = window.location.href;

  window.setInterval(function() {
    if(oldHref !== window.location.href) {
      document.getElementById(frameId).src = chrome.extension.getURL("popup/popup.html") + "?srcUrl=" + window.location.href;
    }
    oldHref = window.location.href;
  }, 500);

  if(oldframe !== null) {
    removeFrame();
    return;
  }
  var iframe = createIframe(frameId, iframeWidth, iframeHeight);
  var handle = createHandle(handleId);
  var offsetLeft = 0;
  var offsetTop = 0;
  handle.onmousedown = function(event) {
    if(event.which === 3) {
      return;
    }
    if(event.which === 2) {
      return removeFrame();
    }
    this.style.cursor = '-webkit-grabbing';
    document.body.style['-webkit-user-select'] = 'none';

    window.ltkbridge.move = true;
    var frameLeft = parseInt(iframe.style.left);
    offsetLeft = event.clientX - frameLeft;
    var frameTop = parseInt(iframe.style.top);
    offsetTop = event.clientY - frameTop;
    event.target.style.height = iframe.height;
    event.target.style.width = iframe.width;

    var self = this;
    document.onmousemove = function (event) {
      var iframe = document.getElementById(frameId);
      if(window.ltkbridge.move === true) {
        var width = window.innerWidth;
        var height = window.innerHeight;

        // if it is going to far to the left
        if (event.clientX - offsetLeft < 0) {
          self.style.left = window.ltkbridge.handleOffset + 'px';
          iframe.style.left = '0px';
        } else if (event.clientX - offsetLeft + 500 > width) { // too far to the right
          self.style.left = (width - 500 + window.ltkbridge.handleOffset) + 'px';
          iframe.style.left = (width - 500) + 'px';
        } else { // otherwise let them drag it like normal
          self.style.left = (event.clientX - offsetLeft + window.ltkbridge.handleOffset) + 'px';
          iframe.style.left = (event.clientX - offsetLeft) + 'px';
        }

        // if it is going past the top of the page
        if (event.clientY - offsetTop < 0) {
          self.style.top = '0px';
          iframe.style.top = '0px';
        } else if (event.clientY - offsetTop + 585 > height) { // if it is going lower than the bottom
          self.style.top = (height - 585) + 'px';
          iframe.style.top = (height - 585) + 'px';
        } else { // otherwise let them drag it
          self.style.top = (event.clientY - offsetTop) + 'px';
          iframe.style.top = (event.clientY - offsetTop) + 'px';
        }
      }
    };

    document.onmouseup = function(event) {
      self.style.cursor = '-webkit-grab';
      document.body.style['-webkit-user-select'] = 'initial';
      window.ltkbridge.move = false;
      self.style.width = "290px";
      self.style.height = "46px";
      document.onmousemove = oldMoveFunction;
      document.onmouseup = oldUpFunction;
      document.onmousedown = oldDownFunction;
    };
  };
  document.body.insertBefore(handle, document.body.firstElementChild);
  document.body.insertBefore(iframe, document.body.firstElementChild);
}

chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
  switch(request.action) {
    case "pin":
      sendResponse('received');
      storePin(setupFrame);
      break;
    case 'removeFrame':
      removeFrame();
      break;
  }
});

function storePin(callback) {
  var pinObject = {};
  pinObject[window.location.host] = '!';
  chrome.storage.local.set(pinObject, callback);
}

function getPin() {
  var pinObject = {};
  pinObject[window.location.host] = 'missing';
  chrome.storage.local.get(pinObject, function (data) {
    if (data[window.location.host] !== 'missing') {
      setupFrame();
    }
  });
}

getPin();
