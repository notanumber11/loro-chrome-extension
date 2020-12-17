// This script is executed as a content script by google chrome
// https://developer.chrome.com/docs/extensions/mv2/content_scripts/
import NlpOrchestrator from "../nlp/NlpOrchestrator";

function processDocument(document:Document) {
    console.log("Executing processDocument ...");
    let nlpOrchestrator = NlpOrchestrator.getInstance();
    let html = document.documentElement.innerHTML;
    nlpOrchestrator.process(document);
    return html;
}

// Not needed now but may be useful on the future.
// It sends the parsed source to popup of the extension
chrome.runtime.sendMessage({
    action: "getSource",
    source: processDocument(document)
});