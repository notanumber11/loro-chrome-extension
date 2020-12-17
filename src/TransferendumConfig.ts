import GuiProxyChrome from "./chrome/GuiProxyChrome";
import GuiProxy from "./gui/guiProxy";
import GuiProxyLocal from "./utils/GuiProxyLocal";

export default class TransferendumConfig {

    private static instance: TransferendumConfig = new TransferendumConfig();
    public readonly isChrome:boolean;
    public readonly guiProxy:GuiProxy;
    public readonly isLocalGUI:boolean;

    private constructor() {
        // TODO: Read automatically from env variables
        this.isChrome = true;
        this.isLocalGUI = false;
        if (this.isChrome) {
            this.guiProxy = new GuiProxyChrome();
        }
        else if (this.isLocalGUI) {
            this.guiProxy = new GuiProxyLocal();
        } else {
            throw new Error("TransferendumConfig has not defined either isChrome or isGUI properties");
        }
    }

    static getSingleton(): TransferendumConfig {
        console.log("The TransferendumConfig is" + TransferendumConfig.instance);
        return TransferendumConfig.instance;
    }

    public toString = () : string => {
        return `TransferendumConfig: isChrome: (${this.isChrome}), isLocalGUI: (${this.isLocalGUI}) `;
    }
}