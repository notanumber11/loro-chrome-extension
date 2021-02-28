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

function startOnboarding() {
    // Add special listener that will run on the loro on-boarding process as part of the tutorial
    // window.addEventListener("loro", ()=> processLoroContent());
    let node = document.createElement("div");
    document.body.appendChild(node);
    ReactDOM.render(<FrameOnBoardingModal closeCallback={()=>(console.log("Calling close!"))} isOpen={true}/>, node);
}

export default function onBoarding() {
    let conf = TransferendumConfig.instance.guiProxy;
    startOnboarding();
    // Reset default values
    conf.setOnLocalStore(TransferendumConfig.FIRST_TIME_MARKED_AS_KNOWN, true);
    conf.setOnLocalStore(TransferendumConfig.DENIED_USER_WEBPAGES_KEY, []);
    conf.setOnLocalStore(TransferendumConfig.WORDS_MARKED_AS_KNOWN, []);
}
