const MODE_OFF = "OFF";
const MODE_IN_ARBEIT = "IN_ARBEIT";
const MODE_FERTIG = "FERTIG";

const btnOff = document.getElementById("btnOff");
const btnInArbeit = document.getElementById("btnInArbeit");
const btnFertig = document.getElementById("btnFertig");

function setActive(mode) {
  [btnOff, btnInArbeit, btnFertig].forEach((b) => b.classList.remove("active"));
  if (mode === MODE_OFF) btnOff.classList.add("active");
  if (mode === MODE_IN_ARBEIT) btnInArbeit.classList.add("active");
  if (mode === MODE_FERTIG) btnFertig.classList.add("active");
}

function sendMode(mode) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (!tab?.id) return;
    chrome.tabs.sendMessage(tab.id, { type: "SET_MODE", mode }, (resp) => {
      setActive(mode);
      chrome.tabs.reload(tab.id);
    });
  });
}

btnOff.addEventListener("click", () => sendMode(MODE_OFF));
btnInArbeit.addEventListener("click", () => sendMode(MODE_IN_ARBEIT));
btnFertig.addEventListener("click", () => sendMode(MODE_FERTIG));

chrome.storage.local.get(["jiraStoryCleanerMode"], (res) => {
  const mode = res.jiraStoryCleanerMode || MODE_OFF;
  setActive(mode);
});
