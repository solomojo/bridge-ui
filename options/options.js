// Saves options to chrome.storage.sync.
function save_options() {
  var token = document.getElementById('token').value;
  var bridge_url = document.getElementById('bridge_url').value;
  chrome.storage.sync.set({
    token: token,
    bridge_url: bridge_url
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Clear options to chrome.storage.sync.
function clear_options() {
  document.getElementById('token').value = '';
  document.getElementById('token').disabled = false;
  document.getElementById('bridge_url').value = '';
  chrome.storage.sync.set({
    token: '',
    bridge_url: ''
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Cleared.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    token: '',
    bridge_url: ''
  }, function(items) {
    document.getElementById('token').value = items.token;
    document.getElementById('bridge_url').value = items.bridge_url;
    if(items.token.length){
      document.getElementById('token').disabled = true;
    }
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('clear').addEventListener('click', clear_options);
