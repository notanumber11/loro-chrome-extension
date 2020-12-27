import GuiProxy from "../gui/GuiProxy";
import TransferendumConfig from "../TransferendumConfig";


export default class GuiProxyLocal extends GuiProxy {

    private static readonly NAME = `[${GuiProxyLocal.name} `;

    sendMessage(message: any, responseCallback?: (response: any) => void) {
        console.log(GuiProxyLocal.NAME + "Sending message: " + message);
    }

    setOnLocalStore(key: string, value: string) {
        console.log(GuiProxyLocal.NAME + `Setting with key=${key} and value=${value}`);
    }

    getOnLocalStore(key: string, callback: (val: string) => void) {
        console.log(GuiProxyLocal.NAME + "Trying to retrieve with key: " + key);
        let value:string;
        if (key == TransferendumConfig.DIFFICULTY_KEY) {
            value = "less";
        }
        else if (key == TransferendumConfig.LORO_SWITCH_KEY) {
            value ="true";
        }
        else {
            throw new Error("Trying to access local storage with non existent key= " + key);
        }
        console.log(GuiProxyLocal.NAME + `Retrieved with key=${key} and value=${value}`);
        callback(value);
    }

    reloadCurrentTab() :void {
        console.log(GuiProxyLocal.NAME + "does not support reload. Please refresh the webpage manually");
    }
}