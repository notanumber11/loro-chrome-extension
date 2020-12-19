import React, {Component} from "react";
import "./ToolTip.scss";
import TranslationCard from "./TranslationCard";

type ToolTipProps = {
    original: string
    translated: string
}

interface IState {
    isHovering?: boolean;
}

class ToolTip extends Component<ToolTipProps, IState> {
    constructor(props) {
        super(props);
        this.handleMouseHover = this.handleMouseHover.bind(this);
        this.state = {
            isHovering: false,
        };
    }

    handleMouseHover() {
        this.setState(this.toggleHoverState);
    }

    toggleHoverState(state) {
        return {
            isHovering: !state.isHovering,
        };
    }

    render() {
        return <span
            onMouseEnter={this.handleMouseHover}
            onMouseLeave={this.handleMouseHover}
            className="ToolTipContainer">
                {this.props.translated}
            {
                this.state.isHovering &&
                <TranslationCard original={this.props.original} translated={this.props.translated}/>
            }
          </span>;
    }
}

export default ToolTip;
