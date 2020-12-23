import GuiProxy from "../gui/GuiProxy";

export default class GuiProxyLocal extends GuiProxy {
    sendMessage(message: any, responseCallback?: (response: any) => void) {
        console.log("Sending message from GuiProxyLocal" + message);
    }

    getOnLocalStore(key: string, callback: (val: string) => void) {
        let valueRetrieved = "more";
        console.log("Getting value from local storage=" + valueRetrieved);
        callback(valueRetrieved);
    }

    saveOnLocalStore(key: string, value: string) {
        console.log(`Storing with key=${key} and value=${value}`)
    }
}