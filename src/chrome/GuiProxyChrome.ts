import GuiProxy from "../gui/GuiProxy";

export default class GuiProxyChrome extends GuiProxy {

    sendMessage(message: any, responseCallback?: (response: any) => void) {
        chrome.runtime.sendMessage(message);
    }

    setOnLocalStore(key:string, value:string) {
        chrome.storage.sync.set({[key]: value}, function() {
            if (chrome.runtime.lastError) {
                console.error(`Problems for storing for key=${key} value=${value}`);
                console.error(chrome.runtime.lastError.message);
            }
        });
    }

    getFromLocalStore(sKey:string, defaultVal?:Object):Promise<Object> {
        return new Promise(function(resolve, reject) {
            chrome.storage.sync.get([sKey], function(result) {
                if (chrome.runtime.lastError) {
                    console.log("Problems retrieving from chrome storage with key=" + sKey);
                    console.error(chrome.runtime.lastError.message);
                    console.error(`Returning for key=${sKey} value=${defaultVal}`);
                    resolve(defaultVal!);
                } else {
                    let val = result[sKey] != null ? result[sKey] : defaultVal;
                    resolve(val);
                }
            });
        });
    }

    reloadCurrentTab() {
        // If is called by the background script we need to ask google chrome to reload
        // using the chrome APIs
        if (chrome.tabs != null) {
            chrome.tabs.query({active: true}, ()=> {
                let code = 'window.location.reload();';
                chrome.tabs.executeScript({code: code});
            });
        }
        // When calling from content script we should use plain js to trigger page reload
        else {
            window.location.reload();
        }

    }

    getWebAccessibleResource(name: string): string {
        return chrome.runtime.getURL(name);
    }
}