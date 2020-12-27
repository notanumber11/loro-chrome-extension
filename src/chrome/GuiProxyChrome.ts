import GuiProxy from "../gui/GuiProxy";

export default class GuiProxyChrome extends GuiProxy {

    sendMessage(message: any, responseCallback?: (response: any) => void) {
        chrome.runtime.sendMessage(message);
    }

    setOnLocalStore(key:string, value:string) {
        chrome.storage.sync.set({[key]: value}, function() {
            console.log(`Saving with key=${key} and value=${value}`);
        });
    }

    getOnLocalStore(key:string, callback:(value:string) => void) {
        chrome.storage.sync.get([key], function(result) {
            let value  = result[key];
            if (value == null) {
                console.warn("Problems retrieving from local storage with key=" + key);
            }
            console.log(`Retrieved with key=${key} and value=${value}`);
            callback(value);
        });
    }

    reloadCurrentTab() {
        chrome.tabs.query({active: true}, function (tabs:Array<any>) {
            let code = 'window.location.reload();';
            chrome.tabs.executeScript(tabs.pop().id, {code: code});
        });
    }
}