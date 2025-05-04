// Default settings
const defaultSettings = {
  reminderInterval: 1,
  reminderEnabled: true,
  reminderMessage: "Time to hydrate! Take a water break.",
  showMotivationalQuotes: true
};

// Initialize settings
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(null, (settings) => {
    if (Object.keys(settings).length === 0) {
      chrome.storage.sync.set(defaultSettings);
    }
    setupReminder();
  });
});

// Setup or update the reminder
function setupReminder() {
  chrome.storage.sync.get(['reminderInterval', 'reminderEnabled'], (settings) => {
    chrome.alarms.clear("drinkWaterReminder");
    
    if (settings.reminderEnabled) {
      chrome.alarms.create("drinkWaterReminder", { 
        periodInMinutes: Number(settings.reminderInterval)
      });
    }
  });
}

// Handle alarms
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "drinkWaterReminder") {
    chrome.storage.sync.get(['reminderMessage', 'showMotivationalQuotes'], (settings) => {
      chrome.windows.create({
        url: "reminder/reminder.html",
        type: "popup",
        width: 500,
        height: 500
      });
    });
  }
});

// Listen for settings changes
chrome.storage.onChanged.addListener((changes) => {
  if ('reminderInterval' in changes || 'reminderEnabled' in changes) {
    setupReminder();
  }
});