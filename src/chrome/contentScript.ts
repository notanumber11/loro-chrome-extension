// This script is executed as a content script by google chrome
// https://developer.chrome.com/docs/extensions/mv2/content_scripts/
import NlpOrchestrator from "../nlp/NlpOrchestrator";
import TransferendumConfig from "../TransferendumConfig";

function processDocument() {
    let nlpOrchestrator = NlpOrchestrator.getInstance();
    let conf = TransferendumConfig.instance;
    let guiProxy = conf.guiProxy;
    // Only process data with the extension if it is enabled
    guiProxy.getOnLocalStore(TransferendumConfig.LORO_SWITCH_KEY, processBasedOnExtensionEnable(conf, nlpOrchestrator));
}

function processBasedOnExtensionEnable(conf:TransferendumConfig, nlpOrchestrator: NlpOrchestrator) {
    return (loroSwitch: string) => {
        if (loroSwitch == null) {
            loroSwitch = "true";
        }
        let switchBoolean = loroSwitch == "true";
        if (switchBoolean) {
            conf.guiProxy.getOnLocalStore(TransferendumConfig.DIFFICULTY_KEY,
                processBasedOnDifficulty(nlpOrchestrator, conf));
        }
    };
}

function processBasedOnDifficulty(nlpOrchestrator: NlpOrchestrator, transferendumConfig: TransferendumConfig) {
    return (difficulty: string) => {
        if (difficulty == null) {
            difficulty = "less";
            console.log("[processDocument] - Problems retrieving difficulty from local store. Using as default value: " + difficulty)
        }
        nlpOrchestrator.process(document, transferendumConfig.difficultyToNumber.get(difficulty)!);
    };
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
    })();

}