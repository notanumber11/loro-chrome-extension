import * as React from 'react';
import Popup from './gui/Popup';
import ReactDOM from 'react-dom';
import TranslationCard from "./gui/TranslationCard";


ReactDOM.render(<Popup />, document.getElementById('popup'));


/*
ReactDOM.render(<TranslationCard original="hello" translated="hola"/>, document.getElementById('popup'));
*/
