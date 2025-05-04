document.addEventListener('DOMContentLoaded', function() {
    // Load saved settings
    chrome.storage.sync.get(null, function(settings) {
        document.getElementById('reminderEnabled').checked = settings.reminderEnabled !== false;
        document.getElementById('reminderInterval').value = settings.reminderInterval || 60;
        document.getElementById('reminderMessage').value = settings.reminderMessage || "Time to hydrate! Take a water break.";
        document.getElementById('showMotivationalQuotes').checked = settings.showMotivationalQuotes !== false;
    });
    
    // Save settings
    document.getElementById('saveSettings').addEventListener('click', function() {
        const newSettings = {
            reminderEnabled: document.getElementById('reminderEnabled').checked,
            reminderInterval: document.getElementById('reminderInterval').value,
            reminderMessage: document.getElementById('reminderMessage').value,
            showMotivationalQuotes: document.getElementById('showMotivationalQuotes').checked
        };
        
        chrome.storage.sync.set(newSettings, function() {
            const status = document.getElementById('statusMessage');
            status.textContent = 'Settings saved!';
            setTimeout(() => status.textContent = '', 2000);
        });
    });
});