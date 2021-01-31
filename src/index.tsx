import * as React from 'react';
import ReactDOM from 'react-dom';
import DefaultPopup from "./gui/DefaultPopup";
import WordHovering from "./gui/WordHovering";
import FrameOnBoardingModal from "./gui/onBoarding/FrameOnBoardingModal";

ReactDOM.render(<DefaultPopup closeCallback={()=>window.close()}/>, document.getElementById('popup'));
/*
ReactDOM.render(<FrameOnBoardingModal closeCallback={()=>(console.log("Calling close!"))} isOpen={true}/>, document.getElementById('popup'));
*/

/*
ReactDOM.render(<WordHovering original="hello" translated="hola"/>, document.getElementById('popup'));
*/


