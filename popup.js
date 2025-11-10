const MODE_OPEN = "open";
const MODE_SELECT = "select";
const MODE_IN_PROGRESS = "in_progress";
const MODE_DONE = "done";
const MODE_ALL = "all";
const EXPAND_ALL = "expand_all";
const COLLAPSE_ALL = "collapse_all";

const btnOpen = document.getElementById("btnOpen");
const btnSelect = document.getElementById("btnSelect");
const btnInProgress = document.getElementById("btnInProgress");
const btnDone = document.getElementById("btnDone");
const btnAll = document.getElementById("btnAll");
const btnAlleAufklappen = document.getElementById("btnAlleAufklappen");
const btnAlleEinklappen = document.getElementById("btnAlleEinklappen");

function setActive(mode) {
  const buttons = [
    { mode: MODE_OPEN, button: btnOpen },
    { mode: MODE_SELECT, button: btnSelect },
    { mode: MODE_IN_PROGRESS, button: btnInProgress },
    { mode: MODE_DONE, button: btnDone },
    { mode: MODE_ALL, button: btnAll },
  ];

  // Remove 'active' class from all buttons
  buttons.forEach(({ button }) => button.classList.remove("active"));

  // Add 'active' class to the selected mode
  const active = buttons.find((b) => b.mode === mode);
  if (active) {
    active.button.classList.add("active");
  }
}

function setActiveAction(actionType) {
  const buttons = [
    { actionType: EXPAND_ALL, button: btnAlleAufklappen },
    { actionType: COLLAPSE_ALL, button: btnAlleEinklappen },
  ];

  // Remove 'active' class from all buttons
  buttons.forEach(({ button }) => button.classList.remove("active"));

  // Add 'active' class to the selected mode
  const active = buttons.find((b) => b.actionType === actionType);
  if (active) {
    active.button.classList.add("active");
  }
}

// Function to send the selected mode to the content script
function sendMode(mode) {
  console.log("send mode");
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (!tab?.id) return;

    chrome.tabs.sendMessage(tab.id, { type: "SET_MODE", mode }, (resp) => {
      setActive(mode);
      chrome.tabs.reload(tab.id);
    });
  });
}

function sendAction(actionType) {
  console.log("send action");
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (!tab?.id) return;
    chrome.tabs.sendMessage(tab.id, { type: actionType }, (resp) => {
      setActiveAction(actionType);
    });
  });
}

btnOpen.addEventListener("click", () => sendMode(MODE_OPEN));
btnSelect.addEventListener("click", () => sendMode(MODE_SELECT));
btnInProgress.addEventListener("click", () => sendMode(MODE_IN_PROGRESS));
btnDone.addEventListener("click", () => sendMode(MODE_DONE));
btnAll.addEventListener("click", () => sendMode(MODE_ALL));

btnAlleAufklappen.addEventListener("click", () => sendAction(EXPAND_ALL));
btnAlleEinklappen.addEventListener("click", () => sendAction(COLLAPSE_ALL));

chrome.storage.local.get(["jiraStoryCleanerMode"], (res) => {
  const mode = res.jiraStoryCleanerMode || MODE_OFF;
  setActive(mode);
});
