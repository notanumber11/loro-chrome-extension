import * as React from 'react';
import ReactDOM from 'react-dom';
import DefaultPopup from "./gui/DefaultPopup";
import WordHovering from "./gui/WordHovering";

ReactDOM.render(<DefaultPopup closeCallback={()=>window.close()}/>, document.getElementById('popup'));

/*
ReactDOM.render(<WordHovering original="hello" translated="hola"/>, document.getElementById('popup'));
*/


