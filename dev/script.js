function getBrowserInfo() {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const language = navigator.language;
    
    let browser, version, os;
    
    if (/MSIE|Trident/.test(userAgent)) {
        browser = 'Internet Explorer';
        version = /MSIE \d+/.exec(userAgent) ? /MSIE (\d+)/.exec(userAgent)[1] : /rv:(\d+)/.exec(userAgent)[1];
    } else if (/Chrome/.test(userAgent) && /Google Inc/.test(navigator.vendor)) {
        browser = 'Google Chrome';
        version = /Chrome\/(\d+)/.exec(userAgent)[1];
    } else if (/Firefox/.test(userAgent)) {
        browser = 'Mozilla Firefox';
        version = /Firefox\/(\d+)/.exec(userAgent)[1];
    } else if (/Safari/.test(userAgent) && /Apple Computer/.test(navigator.vendor)) {
        browser = 'Safari';
        version = /Version\/(\d+)/.exec(userAgent)[1];
    } else if (/Opera|OPR/.test(userAgent)) {
        browser = 'Opera';
        version = /Opera\/(\d+)|OPR\/(\d+)/.exec(userAgent)[1];
    } else {
        browser = 'Unbekannt';
        version = 'Unbekannt';
    }
    
    if (/Win/.test(platform)) {
        os = 'Windows';
    } else if (/Mac/.test(platform)) {
        os = 'MacOS';
    } else if (/Linux/.test(platform)) {
        os = 'Linux';
    } else {
        os = 'Unbekannt';
    }

    document.getElementById('browser').innerText = browser;
    document.getElementById('version').innerText = version;
    document.getElementById('os').innerText = os;
    document.getElementById('platform').innerText = platform;
    document.getElementById('language').innerText = language;
    document.getElementById('userAgent').innerText = userAgent;
}

window.onload = getBrowserInfo;
