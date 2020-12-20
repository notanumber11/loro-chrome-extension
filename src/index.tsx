import * as React from 'react';
import ReactDOM from 'react-dom';
import TranslationCard from "./gui/TranslationCard";
import Popup from "./gui/Popup";
import ReportErrorModal from "./gui/ReportErrorModal";


/*
ReactDOM.render(<TranslationCard original="hello" translated="hola"/>, document.getElementById('popup'));
*/

ReactDOM.render(<ReportErrorModal  original="original" translated="translated"/>, document.getElementById('popup'));

ReactDOM.render(<Popup/>, document.getElementById('popup'));
