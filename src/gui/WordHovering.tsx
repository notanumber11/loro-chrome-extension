import React from 'react';
import TranslationCard from "./TranslationCard";
import {createStyles, withStyles} from "@material-ui/core/styles";
import DemoFrame from "./DemoFrame";
import shadows from "@material-ui/core/styles/shadows";
import ModalEnvelope from "./ModalEnvelope";
import DefaultPopup from "./DefaultPopup";
import ReactDOM from 'react-dom'
import DomHandler from "../nlp/DomHandler";
import ReportErrorModal from "./ReportErrorModal";
import IknowWordModal from "./IknowWordModal";
import confetti  from 'canvas-confetti';

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
    isSettingsOpen: boolean,
    isIknowWordModalOpen: boolean
    shouldRemoveWord: boolean
}

class WordHovering extends React.Component<ToolTipProps, ToolTipState> {

    constructor(props: ToolTipProps) {
        super(props);
        this.state = {
            isReportErrorModalOpen: false,
            isSettingsOpen: false,
            isIknowWordModalOpen: false,
            isHovering: false,
            shouldRemoveWord: false
        };
    }

    setShouldRemoveWord = () => {
        this.setState({
            shouldRemoveWord: true
        });
    };

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

    setIknowWordModalOpenStatus = (val: boolean) => {
        this.setState({
            isIknowWordModalOpen: val
        })
    };

    setHovering = (val: boolean) => {
        this.setState({
            isHovering: val
        });
        if (!val && this.state.shouldRemoveWord) {
            confetti();
            DomHandler.removeTranslation(this.props.translated, this.props.original);
        }
    };

    wordSeenListener = (isVisible: boolean) => {
        if (isVisible) {
            // TODO: Store which words the user has seen
            // console.log("Element visible: " + toolTipProps.translated);
        }
    };


    // Based on: https://blog.theodo.com/2018/01/responsive-iframes-css-trick/
    // @ts-ignore
    render() {
        const {classes} = this.props;
        return (
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
                                             openModalCallback={() => this.setReportErrorModalOpenStatus(true)}
                                             openSettingsCallback={() => this.setSettingsOpenStatus(true)}
                                             openIknowWordCallback={() => this.setIknowWordModalOpenStatus(true)}
                                             removeWordCallback={this.setShouldRemoveWord}
                            />
                        </DemoFrame>
                    }
              </span>

                <ModalEnvelope isOpen={this.state.isReportErrorModalOpen}
                               closeModalCallback={() => this.setReportErrorModalOpenStatus(false)}
                               original={this.props.original} translated={this.props.translated}
                >
                    <ReportErrorModal
                        closeModalCallback={() => this.setReportErrorModalOpenStatus(false)}
                        original={this.props.original}
                        translated={this.props.translated}/>
                </ModalEnvelope>

                <ModalEnvelope isOpen={this.state.isIknowWordModalOpen}
                                   closeModalCallback={() => this.setIknowWordModalOpenStatus(false)}
                                   original={this.props.original} translated={this.props.translated}
                    >
                    <IknowWordModal
                        closeModalCallback={() => this.setIknowWordModalOpenStatus(false)}
                        original={this.props.original}
                        translated={this.props.translated}/>
                </ModalEnvelope>

            </span>
        )
    }
};

export default withStyles(styles)(WordHovering);
