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


