// This script is executed as a content script by google chrome
// https://developer.chrome.com/docs/extensions/mv2/content_scripts/
import NlpOrchestrator from "../nlp/NlpOrchestrator";
import TransferendumConfig from "../TransferendumConfig";

function processDocument() {
    console.log("Executing processDocument ...");
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
            console.warn("[processDocument] - Problems retrieving loroSwitch from local store. Using as default value: " + loroSwitch);
        }
        let switchBoolean = loroSwitch == "true";
        if (switchBoolean) {
            console.log("Loro is ON so we are translating !");
            conf.guiProxy.getOnLocalStore(TransferendumConfig.DIFFICULTY_KEY,
                processBasedOnDifficulty(nlpOrchestrator, conf));
        } else {
            console.log("Loro is OFF so we are not perfoming translations");
        }
    };
}

function processBasedOnDifficulty(nlpOrchestrator: NlpOrchestrator, transferendumConfig: TransferendumConfig) {
    return (difficulty: string) => {
        if (difficulty == null) {
            difficulty = "less";
            console.warn("[processDocument] - Problems retrieving difficulty from local store. Using as default value: " + difficulty)
        }
        nlpOrchestrator.process(document, transferendumConfig.difficultyToNumber.get(difficulty));
    };
}

if (!TransferendumConfig.instance.isLocal) {
    processDocument();
}

export default {};