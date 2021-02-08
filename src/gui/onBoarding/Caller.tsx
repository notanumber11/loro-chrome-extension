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

function startOnboarding(val:string) {
    if (val=="true" || 1 == 1) {
        // Add special listener that will run on the loro on-boarding process as part of the tutorial
        window.addEventListener("loro", ()=> processLoroContent());
        let node = document.createElement("div");
        document.body.appendChild(node);
        console.log(document);
        ReactDOM.render(<FrameOnBoardingModal closeCallback={()=>(console.log("Calling close!"))} isOpen={true}/>, node);
        TransferendumConfig.instance.guiProxy.setOnLocalStore(TransferendumConfig.LORO_JUST_INSTALLED, "false");
    }
}

export default function onBoarding() {
    TransferendumConfig.instance.guiProxy.getFromLocalStore(TransferendumConfig.LORO_JUST_INSTALLED, "false")
        .then(val=> startOnboarding(val.toString()));
}
