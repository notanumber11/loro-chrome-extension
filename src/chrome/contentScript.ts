// This script is executed as a content script by google chrome
// https://developer.chrome.com/docs/extensions/mv2/content_scripts/
import NlpOrchestrator from "../nlp/NlpOrchestrator";
import TransferendumConfig from "../TransferendumConfig";
import onBoarding from "../gui/onBoarding/Caller";


async function canRunInThisWebpage(conf:TransferendumConfig) {
    // @ts-ignore
    let urls:Array<string> = (await conf.guiProxy.getFromLocalStore(TransferendumConfig.DENIED_USER_WEBPAGES, []));
    let currentUrl = TransferendumConfig.formatUrl(window.location.href);
    let result = urls.indexOf(currentUrl) == -1 && urls.length != 0;
    return result;
}

async function processDocument() {
    let nlpOrchestrator = NlpOrchestrator.getInstance();
    let conf = TransferendumConfig.instance;
    let guiProxy = conf.guiProxy;
    // Only process data with the extension if it is enabled
    let isExtensionEnabled = (await guiProxy.getFromLocalStore(TransferendumConfig.LORO_SWITCH_KEY, "true")) == "true";

    let canRunOnThisWebpage = await canRunInThisWebpage(conf);
    await processBasedOnExtensionEnable(isExtensionEnabled && canRunOnThisWebpage , conf, nlpOrchestrator);
}

async function processBasedOnExtensionEnable(isExtensionEnabled:boolean, conf:TransferendumConfig, nlpOrchestrator: NlpOrchestrator) {
    if (isExtensionEnabled) {
        let difficultyString = (await conf.guiProxy.getFromLocalStore(TransferendumConfig.DIFFICULTY_KEY, "less")).toString();
        let difficultyNumber = TransferendumConfig.difficultyToNumber.get(difficultyString)!;
        let language = (await conf.guiProxy.getFromLocalStore(TransferendumConfig.LANGUAGE_KEY, "en")).toString();
        nlpOrchestrator.process(document, difficultyNumber, language);
    }
}

// Do not run the extension if we are running locally to debug the GUI
if (!TransferendumConfig.instance.isLocal) {
    // This function is here to guarantee that we only run the contentScript once per webpage
    // The reason for this is that the "chrome.tabs.onUpdated.addListener" used on background.ts
    // can be triggered several times for a single webpage.
    (function() {
        // @ts-ignore
        if (window.hasRun) return;
        // @ts-ignore
        window.hasRun = true;
        // Rest of code
        onBoarding();
        processDocument();
    })();
}