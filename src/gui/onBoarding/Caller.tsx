// Responsability: Interact with the DOM
import React from 'react';
import ReactDOM from 'react-dom';
import FrameOnBoardingModal from "./FrameOnBoardingModal";
import NlpOrchestrator from "../../nlp/NlpOrchestrator";
import TransferendumConfig from "../../TransferendumConfig";

function processLoroContent() {
    let nlpOrchestrator = NlpOrchestrator.getInstance();
    nlpOrchestrator.processLoro(document);
}

const closeCallback = async ()=> {
    console.log("On-boarding has finished!");
    let node = document.createElement("div");
    node.id = 'loroOnBoardingFinished';
    node.style.display = "none";
    let motherTongue = TransferendumConfig.getMotherTongue();
    let languageToLearn = TransferendumConfig.getLanguage();
    node.innerText = `MotherTongue=${motherTongue} LanguageToLearn=${languageToLearn}`;
    document.body.appendChild(node);
};

function startOnboarding() {
    let node = document.createElement("div");
    node.id = 'loroExtensionInstalled';
    document.body.appendChild(node);
    // Only run onBoarding in the loro on-boarding webpage
    if (window.location.href.includes("loroOnBoarding")) {
        console.log("Running on-boarding since we are in the on-boarding webpage");
        ReactDOM.render(<FrameOnBoardingModal closeCallback={closeCallback} isOpen={true}/>, node);
    }
}

export default function onBoarding(justInstalled:boolean) {
    if (justInstalled) {
        console.log("Clearing storage");
        chrome.storage.sync.clear();
        let conf = TransferendumConfig.instance;
        conf.guiProxy.setOnLocalStore(TransferendumConfig.FIRST_TIME_MARKED_AS_KNOWN, true);
    }
    startOnboarding();
}
