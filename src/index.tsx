import * as React from 'react';
import ReactDOM from 'react-dom';
import DefaultPopup from "./gui/DefaultPopup";
import WordHovering from "./gui/WordHovering";
import FrameOnBoardingModal from "./gui/onBoarding/FrameOnBoardingModal";
import i18n from "./i18n"
import { Suspense } from 'react';
// Ensure i18n is bundled
if (i18n == null) {
    console.log("Problems with i18n, it is null");
}

/*
ReactDOM.render(
    <Suspense fallback="loading">
        <DefaultPopup closeCallback={()=>window.close()}/>
    </Suspense>,
    document.getElementById('popup'));
*/

/*
ReactDOM.render(<FrameOnBoardingModal closeCallback={()=>(console.log("Calling close!"))} isOpen={true}/>,  document.getElementById('popup'));
*/

ReactDOM.render(<div> <span>I love Loro </span><WordHovering original="resultado" translated="wynik"/></div>, document.getElementById('popup'));


