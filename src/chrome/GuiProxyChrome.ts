import GuiProxy from "../gui/guiProxy";

export default class GuiProxyChrome extends GuiProxy {
    sendMessage(message: any, responseCallback?: (response: any) => void) {
        console.log("Sending message from GuiProxyChrome");
        chrome.runtime.sendMessage(message);
    }
}