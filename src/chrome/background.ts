import Tab = chrome.tabs.Tab;
import TabChangeInfo = chrome.tabs.TabChangeInfo;
import TransferendumConfig from "../TransferendumConfig";

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
    let development = false;
    if (!development) {
        TransferendumConfig.instance.guiProxy.setOnLocalStore(TransferendumConfig.LORO_JUST_INSTALLED_KEY, true);
        chrome.tabs.create({url: "https://notanumber11.github.io/loro/"}, function (tab) {});
    }
});
