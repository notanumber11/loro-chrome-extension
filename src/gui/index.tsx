import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Popup from './Popup';
import TransferendumConfig from "../TransferendumConfig";

let conf:TransferendumConfig = TransferendumConfig.getSingleton();

ReactDOM.render(<Popup conf={conf} />, document.getElementById('popup'));
