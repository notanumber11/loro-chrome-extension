import * as React from 'react';
import ReactDOM from 'react-dom';
import TranslationCard from "./gui/TranslationCard";
import DefaultPopup from "./gui/DefaultPopup";
import ReportErrorModal from "./gui/ReportErrorModal";
import ContactPopup from "./gui/ContactPopup";
import Popup from "./gui/Popup";
import WordHovering from "./gui/WordHovering";


/*
ReactDOM.render(<TranslationCard original="hello" translated="hola"/>, document.getElementById('popup'));
*/

/*
ReactDOM.render(<WordHovering original="hello" translated="hola"/>, document.getElementById('popup2'));
*/


/*
ReactDOM.render(<ReportErrorModal  original="original" translated="translated"/>, document.getElementById('popup'));
*/

ReactDOM.render(<Popup/>, document.getElementById('popup'));

/*
ReactDOM.render(<ContactPopup/>, document.getElementById('popup'));
*/
