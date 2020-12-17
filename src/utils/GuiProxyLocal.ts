import GuiProxy from "../gui/guiProxy";

export default class GuiProxyLocal extends GuiProxy {
    sendMessage(message: any, responseCallback?: (response: any) => void) {
        console.log("Sending message from GuiProxyLocal" + message);
    }
}