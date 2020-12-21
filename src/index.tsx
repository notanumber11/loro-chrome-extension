import * as React from 'react';
import ReactDOM from 'react-dom';
import TranslationCard from "./gui/TranslationCard";
import DefaultPopup from "./gui/DefaultPopup";
import ReportErrorModal from "./gui/ReportErrorModal";
import FeedbackPopup from "./gui/FeedbackPopup";
import Popup from "./gui/Popup";


/*
ReactDOM.render(<TranslationCard original="hello" translated="hola"/>, document.getElementById('popup'));
*/

/*
ReactDOM.render(<ReportErrorModal  original="original" translated="translated"/>, document.getElementById('popup'));
*/

ReactDOM.render(<Popup/>, document.getElementById('popup'));

/*
ReactDOM.render(<FeedbackPopup/>, document.getElementById('popup'));
*/
