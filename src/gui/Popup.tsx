import React, {Component} from "react";
import "./Popup.scss";
import TransferendumConfig from "../TransferendumConfig";

type PopupProps = {
  conf: TransferendumConfig
}

class Popup extends Component<PopupProps> {
  private readonly conf:TransferendumConfig;
  constructor(props) {
    super(props);
    this.conf = props.conf;
  }

  componentDidMount() {
    this.conf.guiProxy.sendMessage({ popupMounted: true });
  }

  render() {
    return <div className="popupContainer">Bienvenido a transferendum</div>;
  }
}

export default Popup;
