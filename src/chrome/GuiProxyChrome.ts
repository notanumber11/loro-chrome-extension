import GuiProxy from "../gui/GuiProxy";

export default class GuiProxyChrome extends GuiProxy {
    sendMessage(message: any, responseCallback?: (response: any) => void) {
        console.log("Sending message from GuiProxyChrome");
        chrome.runtime.sendMessage(message);
    }

    saveOnLocalStore(key:string, value:string) {
        chrome.storage.sync.set({key: value}, function() {
            console.log(`Saving on local chrome storage with key=${key} and value=${value}`);
        });
    }

    getOnLocalStore(key:string, callback:(value:string) => void) {
        chrome.storage.sync.get(['key'], function(result) {
            let value  = result.key;
            console.log(`Retrieving from local chrome storage with key=${key} and value=${value}`);
            callback(value);
        });
    }
}