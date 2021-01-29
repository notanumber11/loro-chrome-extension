import Tab = chrome.tabs.Tab;
import TabChangeInfo = chrome.tabs.TabChangeInfo;

chrome.tabs.onUpdated.addListener((tabId: number, changeInfo: TabChangeInfo, tab: Tab) => {
    chrome.tabs.executeScript({
        file: 'js/contentScript.js',
        runAt: "document_idle"
    }, _ =>{
        // Swallow the errors related with the extension not having permissions to run
        // on specific webpages
        let e = chrome.runtime.lastError;
        if(e !== undefined){
            if (!e.message?.includes("Cannot access")) {
                console.trace(`Unexpected error: ${e.message}`)
            }
        }
    });
});

chrome.runtime.onInstalled.addListener(function() {
    alert('You just made the best decision of today, by installing GMass!\n\nWe will now redirect you to your Gmail account so you can get started sending email campaigns inside Gmail.');

    chrome.tabs.create({
        url: 'https://mail.google.com',
        active: true
    });

    return false;
});

