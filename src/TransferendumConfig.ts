import GuiProxyChrome from "./chrome/GuiProxyChrome";
import GuiProxyLocal from "./utils/GuiProxyLocal";
import GuiProxy from "./gui/GuiProxy";

export default class TransferendumConfig {

    public static readonly  DIFFICULTY_KEY = "loroDifficulty";
    public static readonly LORO_SWITCH_KEY = "loroSwitchKey";
    public static readonly LANGUAGE_KEY = "loroLanguageKey";

    public static readonly difficultyToNumber:Map<string, number> = new Map([
        ["less", 1],
        ["more", 2],
        ["many", 4]
    ]);

    public static instance = new TransferendumConfig();

    public readonly guiProxy:GuiProxy;
    public readonly isLocal:boolean;

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