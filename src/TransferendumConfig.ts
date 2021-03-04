import GuiProxyChrome from "./chrome/GuiProxyChrome";
import GuiProxyLocal from "./utils/GuiProxyLocal";
import GuiProxy from "./gui/GuiProxy";

export default class TransferendumConfig {

    public static readonly DIFFICULTY_KEY = "loroDifficulty";
    public static readonly LORO_SWITCH_KEY = "loroSwitchKey";
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

    public static setMotherTongue(motherTongue:string) {
        TransferendumConfig.instance.guiProxy.setOnLocalStore(TransferendumConfig.instance.MOTHER_TONGUE_KEY, motherTongue);
    }

    public static setLanguage(language:string) {
        TransferendumConfig.instance.guiProxy.setOnLocalStore(TransferendumConfig.instance.LANGUAGE_KEY, language);
    }

    public static async getMotherTongue() {
        let motherTongue = (await TransferendumConfig.instance.guiProxy.getFromLocalStore(TransferendumConfig.instance.MOTHER_TONGUE_KEY, "error")).toString();
        if (motherTongue != "error") {
            return motherTongue;
        }
        return TransferendumConfig.instance.getDefaultMotherTongueLanguage();
    }

    public static async getLanguage() {
        let language = (await TransferendumConfig.instance.guiProxy.getFromLocalStore(TransferendumConfig.instance.LANGUAGE_KEY, "error")).toString();
        let motherTongue = await TransferendumConfig.getMotherTongue();
        if (language != "error") {
            return TransferendumConfig.instance.verifyLanguageIsAvailable(motherTongue, language);
        }
        return TransferendumConfig.instance.getDefaultLanguage(motherTongue);
    }

    public static formatUrl(url: string) {
        url = url.replace("http://", "");
        url = url.replace("https://", "");
        url = url.replace("www.", "");
        let endIndex = url.indexOf("/");
        url = url.substring(0, endIndex);
        url = url.toLowerCase();
        return url;
    }

    public readonly guiProxy: GuiProxy;
    public readonly isLocal: boolean;
    private readonly LANGUAGE_KEY = "loroLanguageKey";
    private readonly MOTHER_TONGUE_KEY = "loroMotherTongue";

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

    public getDefaultMotherTongueLanguage() {
        let browserLanguage = null;
        try {
            browserLanguage = window.navigator.language.toLowerCase();
        } catch (e) {
            return "en";
        }
        if (browserLanguage.includes("es")) {
            browserLanguage = "es";
        } else if (browserLanguage.includes("en")) {
            browserLanguage = "en";
        } else if (browserLanguage.includes("pl")) {
            browserLanguage = "pl";
        }
        return browserLanguage;
    }

    public getDefaultLanguage(motherTongue: string):string {
        let language = "en";
        if (motherTongue == "en") {
            language = "es";
        } else if (motherTongue == "es") {
            language = "en";
        } else if (motherTongue == "pl") {
            language = "en";
        }
        return TransferendumConfig.instance.verifyLanguageIsAvailable(motherTongue, language);
    }

    private verifyLanguageIsAvailable(motherTongue:string, language:string):string {
        if (!TransferendumConfig.AVAILABLE_LANGUAGES.has(motherTongue)) {
            console.error("Incorrect motherTongue" + motherTongue);
            return "es";
        }
        let availableLanguages = TransferendumConfig.AVAILABLE_LANGUAGES.get(motherTongue)!;
        let available:boolean = availableLanguages.includes(language);
        if (available) {
            return language;
        }
        return availableLanguages[0];
    }
}