document.addEventListener('DOMContentLoaded', function() {
    // Load settings and display reminder
    chrome.storage.sync.get(['reminderMessage', 'showMotivationalQuotes'], function(settings) {
        const messageElement = document.getElementById('reminderMessage');
        messageElement.textContent = settings.reminderMessage || "Keep your mind sharp and your body hydrated. Take a sip now!";
        
        if (settings.showMotivationalQuotes) {
            displayMotivationalQuote();
        }
    });
    
    // Snooze functionality
    document.getElementById('snoozeButton').addEventListener('click', function() {
        chrome.alarms.create("drinkWaterReminder", {
            delayInMinutes: 10
        });
        window.close();
    });
});

function displayMotivationalQuote() {
    const quotes = [
        "Water is the driving force of all nature. - Leonardo da Vinci",
        "Drinking water is like washing out your insides. - Unknown",
        "Pure water is the world's first and foremost medicine. - Slovakian Proverb",
        "Water is the best natural remedy. - Unknown",
        "Hydration is the key to unlocking your full potential. - Unknown"
    ];
    
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('motivationalQuote').textContent = randomQuote;
}