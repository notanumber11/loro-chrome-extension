import GuiProxyChrome from "./chrome/GuiProxyChrome";
import GuiProxyLocal from "./utils/GuiProxyLocal";
import GuiProxy from "./gui/GuiProxy";

export default class TransferendumConfig {

    public static readonly DIFFICULTY_KEY = "loroDifficulty";
    public static readonly LORO_SWITCH_KEY = "loroSwitchKey";
    public static readonly LANGUAGE_KEY = "loroLanguageKey";
    public static readonly MOTHER_TONGUE_KEY = "loroMotherTongue";
    public static readonly LORO_JUST_INSTALLED_KEY = "loroJustInstalled";
    public static readonly DENIED_USER_WEBPAGES_KEY = "loroDeniedWebpages";
    public static readonly FIRST_TIME_MARKED_AS_KNOWN = "loroFirstTimeMarkedAsKnown";
    public static readonly WORDS_MARKED_AS_KNOWN = "loroWordsMarkedAsKnown";

    public static readonly DISALLOW_WEBPAGES_KEY = [
        "facebook",
        "instagram",
        "whatsapp",
        "telegram",
        "signal",
        "messenger",
        "mail",
        "gmail",
        "tiktok",
        "twitter",
        "bank",
        "banco",
        "banca",
        "revolut",
        "paypal",
        "bbva",
        "ing"
    ];

    public static readonly DIFFICULTY_TO_PERCENTAGE: Map<string, number> = new Map([
        ["less", 1],
        ["more", 2],
        ["many", 4]
    ]);

    public static readonly AVAILABLE_LANGUAGES: Map<string, Array<string>> = new Map([
        ["es", ["en", "fr", "it", "pl", "pt"]],
        ["en", ["de", "es", "fr"]],
        ["pl", ["de", "es", "en"]],
    ]);

    public static readonly LANGUAGE_CODE_TO_LANGUAGE: Map<string, string> = new Map([
        ["es", "Español"],
        ["en", "English"],
        ["fr", "Français"],
        ["it", "Italiano"],
        ["de", "Deutsch"],
        ["pl", "Polski"],
        ["pt", "Português"]
    ]);

    public static instance = new TransferendumConfig();

    public readonly guiProxy: GuiProxy;
    public readonly isLocal: boolean;

    public static formatUrl(url: string) {
        url = url.replace("http://", "");
        url = url.replace("https://", "");
        url = url.replace("www.", "");
        let endIndex = url.indexOf("/");
        url = url.substring(0, endIndex);
        url = url.toLowerCase();
        return url;
    }

    private constructor() {
        if (process.env.isChrome == "true") {
            this.guiProxy = new GuiProxyChrome();
            this.isLocal = false;
        } else if (process.env.isChrome == "false") {
            this.guiProxy = new GuiProxyLocal();
            this.isLocal = true;
        } else {
            throw new Error("TransferendumConfig has not defined either isChrome or isGUI properties");
        }
    }
}