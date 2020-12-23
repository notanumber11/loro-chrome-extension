import GuiProxyChrome from "./chrome/GuiProxyChrome";
import GuiProxyLocal from "./utils/GuiProxyLocal";
import GuiProxy from "./gui/GuiProxy";

export default class TransferendumConfig {

    public readonly guiProxy:GuiProxy;

    public static transferendumConfig = new TransferendumConfig();

    public constructor() {
        if (process.env.isChrome == "true") {
            this.guiProxy = new GuiProxyChrome();
        }
        else if (process.env.isChrome == "false") {
            this.guiProxy = new GuiProxyLocal();
        } else {
            throw new Error("TransferendumConfig has not defined either isChrome or isGUI properties");
        }
    }
}