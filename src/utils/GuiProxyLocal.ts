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

    reloadCurrentTab() :void {
        console.log(GuiProxyLocal.NAME + "does not support reload. Please refresh the webpage manually");
    }

    getFromLocalStore(sKey: string, defaultVal?: Object): Promise<Object> {
        return new Promise(function(resolve, reject) {
            /* missing implementation */
            resolve(defaultVal);
        });
    }

    getWebAccessibleResource(name: string): string {
        return "loro.svg";
    }

}