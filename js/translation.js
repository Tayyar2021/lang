const { headers } = require("next/headers");

function loadTranslations(language, callback) {
    const request = new XMLHttpRequest();
    request.open('GET', `${language}.json`, true);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            const translations = JSON.parse(request.responseText);
            callback(translations);
        }
    };
    request.send();
}

 
function setLanguage(language) {
    // تعيين اتجاه النص بناءً على اللغة
    document.body.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.body.className = language === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('selectedLanguage', language);

    loadTranslations(language, function(translations) {
        document.getElementById('welcome_message').innerText = translations.welcome_message;
        document.getElementById('about_us').innerText = translations.about_us;
        document.getElementById('contact_us').innerText = translations.contact_us;
        document.getElementById('home').innerText = translations.home;
        document.getElementById('Dark_Light').innerText = translations.Dark_Light;

    });
}


 
function toggleTheme() {
    const body = document.body;
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
 
        localStorage.setItem('selectedTheme', 'light-mode');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('selectedTheme', 'dark-mode');
    }
}


window.onload = function() {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    const savedTheme = localStorage.getItem('selectedTheme') || 'light-mode';
    setLanguage(savedLanguage);
    document.body.classList.add(savedTheme);
}
