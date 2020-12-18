import React, {Component} from "react";
import "./Popup.scss";
import TransferendumConfig from "../TransferendumConfig";

class Popup extends Component {
  readonly trans:TransferendumConfig;
  constructor(props) {
    super(props);
    this.trans = new TransferendumConfig();
  }

  componentDidMount() {
    this.trans.guiProxy.sendMessage({ popupMounted: true });
  }

  render() {
    return <div className="popupContainer">Bienvenido a transferendum</div>;
  }
}

export default Popup;
