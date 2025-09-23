(function () {
  const MODE_OPEN = "open";
  const MODE_SELECT = "select";
  const MODE_IN_PROGRESS = "in_progress";
  const MODE_DONE = "done";
  const MODE_ALL = "all";

  const CONTAINER_SELECTORS =
    ".ghx-heading, .ghx-issue, [data-testid='software-board.issue-card']";
  const SEL_DONE =
    "span.jira-issue-status-lozenge.jira-issue-status-lozenge-done";
  const SEL_INPROGRESS =
    "span.jira-issue-status-lozenge.jira-issue-status-lozenge-inprogress";
  const SEL_NEW =
    "span.jira-issue-status-lozenge.jira-issue-status-lozenge-new";

  let currentMode = MODE_ALL;
  let observer = null;
  let debounceTimer = null;

  function removeByStatus(selector) {
    document.querySelectorAll(selector).forEach((el) => {
      const c = el.closest(CONTAINER_SELECTORS);
      if (c) c.remove();
    });
  }

  function applyMode() {
    if (currentMode === MODE_ALL) {
      return; // Reload to reset the view
    } else if (currentMode === MODE_OPEN) {
      removeByStatus(SEL_DONE);
    } else if (currentMode === MODE_SELECT) {
      removeByStatus(SEL_DONE);
      removeByStatus(SEL_INPROGRESS);
    } else if (currentMode === MODE_IN_PROGRESS) {
      removeByStatus(SEL_DONE);
      removeByStatus(SEL_NEW);
    } else if (currentMode === MODE_DONE) {
      // NEW + INPROGRESS entfernen
      removeByStatus(SEL_INPROGRESS);
      removeByStatus(SEL_NEW);
    }
  }

  function scheduleApply() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(applyMode, 100);
  }

  function ensureObserver(on) {
    if (on && !observer) {
      const target = document.body || document.documentElement;
      observer = new MutationObserver(scheduleApply);
      observer.observe(target, { childList: true, subtree: true });
      // SPA-Navigationen zusätzlich abfangen
      window.addEventListener("popstate", scheduleApply);
      window.addEventListener("hashchange", scheduleApply);
    } else if (!on && observer) {
      observer.disconnect();
      observer = null;
      window.removeEventListener("popstate", scheduleApply);
      window.removeEventListener("hashchange", scheduleApply);
    }
  }
  if (
    typeof chrome !== "undefined" &&
    chrome.runtime &&
    chrome.runtime.onMessage
  ) {
    chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
      if (msg?.type === "SET_MODE") {
        currentMode = msg.mode || MODE_ALL;
        try {
          chrome.storage?.local?.set({ jiraStoryCleanerMode: currentMode });
        } catch {}
        ensureObserver(currentMode !== MODE_ALL);
        applyMode();
        sendResponse?.({ ok: true, mode: currentMode });
        return true;
      }
      if (msg?.type === "GET_MODE") {
        sendResponse?.({ mode: currentMode });
        return true;
      }
    });
  }

  function init() {
    const readMode = (cb) => {
      if (chrome?.storage?.local) {
        chrome.storage.local.get(["jiraStoryCleanerMode"], (res) => {
          cb(res?.jiraStoryCleanerMode || MODE_ALL);
        });
      } else {
        cb(MODE_ALL);
      }
    };

    readMode((saved) => {
      currentMode = saved;
      ensureObserver(currentMode !== MODE_ALL);
      applyMode();
      console.log(`Jira Story Cleaner initialized with mode: ${currentMode}`);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
