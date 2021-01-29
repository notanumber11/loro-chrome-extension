// This script is executed as a content script by google chrome
// https://developer.chrome.com/docs/extensions/mv2/content_scripts/
import NlpOrchestrator from "../nlp/NlpOrchestrator";
import TransferendumConfig from "../TransferendumConfig";

async function processDocument() {
    let nlpOrchestrator = NlpOrchestrator.getInstance();
    let conf = TransferendumConfig.instance;
    let guiProxy = conf.guiProxy;
    // Only process data with the extension if it is enabled
    let isExtensionEnabled = await guiProxy.getFromLocalStore(TransferendumConfig.LORO_SWITCH_KEY, "true");
    await processBasedOnExtensionEnable(isExtensionEnabled == "true", conf, nlpOrchestrator);
}

function processLoroContent() {
    let nlpOrchestrator = NlpOrchestrator.getInstance();
    nlpOrchestrator.processLoro(document);
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
        processDocument();
        // Add special listener that will run on the loro webpage as part of the tutorial
        window.addEventListener("loro", ()=> processLoroContent());
    })();

}