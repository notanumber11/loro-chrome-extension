import * as React from 'react';
import ReactDOM from 'react-dom';
import TranslationCard from "./gui/TranslationCard";
import NewPopUp from "./gui/NewPopUp";


/*
ReactDOM.render(<TranslationCard original="hello" translated="hola"/>, document.getElementById('popup'));
*/
ReactDOM.render(<NewPopUp/>, document.getElementById('popup'));
