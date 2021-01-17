import React from 'react';
import TranslationCard from "./TranslationCard";
import {createStyles, withStyles} from "@material-ui/core/styles";
import VisibilitySensor from "react-visibility-sensor";
import DemoFrame from "./DemoFrame";
import shadows from "@material-ui/core/styles/shadows";
import ModalEnvelope from "./ModalEnvelope";
import DefaultPopup from "./DefaultPopup";
import ReactDOM from 'react-dom'

const styles = createStyles({
    hovering: {
        backgroundColor: "#def8ff",
        position: "relative",
        display: "inline-block",
        cursor: "pointer"
    }
});

const translationCardStylesFrame = {
    width: "0px",
    height: "0px",
    border: "none",
    padding: "none",
    boxShadow: shadows[3],
    zIndex: 1,
    // Based on: https://blog.theodo.com/2018/01/responsive-iframes-css-trick/
    position: "absolute",
    top: "100%",
    left: "0%",
    maxWidth: "fit-content",
    maxHeight: "fit-content"
};

const popUpStylesFrame = {
    width: "0px",
    height: "0px",
    border: "none",
    padding: "none",
    boxShadow: shadows[3],
    zIndex: 2147483647,
    // Try to emulate the position of the popup in the chrome extension
    position: "fixed",
    right: "20px",
    top: "20px",
    maxHeight: "1000px"
};

type ToolTipProps = {
    original: string
    translated: string
    classes: any
}

type ToolTipState = {
    isReportErrorModalOpen: boolean,
    isHovering: boolean,
    isSettingsOpen: boolean
}

class WordHovering extends React.Component<ToolTipProps, ToolTipState> {

    constructor(props: ToolTipProps) {
        super(props);
        this.state = {
            isReportErrorModalOpen: false,
            isSettingsOpen: false,
            isHovering: false
        };
    }

    componentDidMount(): void {
        // We need to create a div on the parent root because we want this div
        // to be over any div inside the document.
        // If this div will be nested it will not be able to be showed on top
        // of all the elements of the webpage
        let myDiv = document.createElement("div");
        myDiv.id = 'div_id';
        document.body.appendChild(myDiv);
    }

    componentDidUpdate(prevProps: Readonly<ToolTipProps>, prevState: Readonly<ToolTipState>, snapshot?: any): void {
        let element = <DemoFrame frameStyles={popUpStylesFrame}>
            <div>
                {
                    this.state.isSettingsOpen &&
                    <DefaultPopup closeCallback={() => this.setSettingsOpenStatus(false)}/>
                }
            </div>
                    </DemoFrame>;
        ReactDOM.render(element, document.getElementById("div_id"));
    }

    setReportErrorModalOpenStatus = (val: boolean) => {
        this.setState({
            isReportErrorModalOpen: val
        })
    };

    setSettingsOpenStatus = (val: boolean) => {
        this.setState({
            isSettingsOpen: val
        })
    };

    setHovering = (val: boolean) => {
        this.setState({
            isHovering: val
        })
    };

    wordSeenListener = (isVisible: boolean) => {
        if (isVisible) {
            // TODO: Store which words the user has seen
            // console.log("Element visible: " + toolTipProps.translated);
        }
    };


    // Based on: https://blog.theodo.com/2018/01/responsive-iframes-css-trick/
    // Offset of 100 since people has not seen what is in the bottom of the street while reading.
    // @ts-ignore
    render() {
        const {classes} = this.props;
        return (<VisibilitySensor onChange={this.wordSeenListener} offset={{bottom: 100}}>
            <span>
                <span
                    onMouseEnter={() => this.setHovering(true)}
                    onMouseLeave={() => this.setHovering(false)}
                    className={classes.hovering}>
                        {this.props.translated}
                    {
                        this.state.isHovering &&
                        <DemoFrame frameStyles={translationCardStylesFrame}>
                            <TranslationCard original={this.props.original} translated={this.props.translated}
                                             updateModal={this.setReportErrorModalOpenStatus}
                                             updateSettings={this.setSettingsOpenStatus}/>
                        </DemoFrame>
                    }
                  </span>
                <ModalEnvelope isOpen={this.state.isReportErrorModalOpen}
                               closeCallback={this.setReportErrorModalOpenStatus}
                               original={this.props.original} translated={this.props.translated}/>
            </span>
        </VisibilitySensor>)
    }
};

export default withStyles(styles)(WordHovering);
