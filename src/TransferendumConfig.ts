import GuiProxyChrome from "./chrome/GuiProxyChrome";
import GuiProxyLocal from "./utils/GuiProxyLocal";
import GuiProxy from "./gui/GuiProxy";

export default class TransferendumConfig {

    public static readonly  DIFFICULTY_KEY = "difficulty";
    public static readonly LORO_SWITCH_KEY = "loroSwitchKey";

    public readonly guiProxy:GuiProxy;
    public readonly isLocal:boolean;

    public static instance = new TransferendumConfig();

    public readonly difficultyToNumber:Map<string, number> = new Map([
        ["less", 5],
        ["more", 10],
        ["many", 15]
    ]);


    private constructor() {
        if (process.env.isChrome == "true") {
            this.guiProxy = new GuiProxyChrome();
            this.isLocal = false;
        }
        else if (process.env.isChrome == "false") {
            this.guiProxy = new GuiProxyLocal();
            this.isLocal = true;
        } else {
            throw new Error("TransferendumConfig has not defined either isChrome or isGUI properties");
        }
    }
}