import React from 'react';
import TranslationCard from "./TranslationCard";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import VisibilitySensor from "react-visibility-sensor";
import DemoFrame from "./DemoFrame";
import shadows from "@material-ui/core/styles/shadows";
import ModalEnvelope from "./ModalEnvelope";

const useStyles = makeStyles(() =>
    createStyles({
        hovering: {
            backgroundColor: "#def8ff",
            position: "relative",
            display: "inline-block",
            cursor: "pointer"
        }
    })
);

type ToolTipProps = {
    original: string
    translated: string
}

const WordHovering = (toolTipProps: ToolTipProps) => {
    const classes = useStyles();

    const [isModalOpen, setModalOpenStatus] = React.useState(false);

    const [isHovering, setHovering] = React.useState(false);

    const wordSeenListener = (isVisible: boolean) => {
        if (isVisible) {
            console.log("Element visible: " + toolTipProps.translated);
        }
    };

    const setModalVisibilityCallback = (val: boolean) => {
        setModalOpenStatus(val);
    };

    const frameStyles = {
        width: "0px",
        height: "0px",
        border: "none",
        padding: "none",
        boxShadow: shadows[1],
        zIndex: 1,
        // Based on: https://blog.theodo.com/2018/01/responsive-iframes-css-trick/
        position: "absolute",
        top: "100%",
        left: "0%",
        maxWidth: "fit-content",
        maxHeight: "fit-content"
    };

    // Based on: https://blog.theodo.com/2018/01/responsive-iframes-css-trick/
    // Offset of 100 since people has not seen what is in the bottom of the street while reading.
    return <VisibilitySensor onChange={wordSeenListener} offset={{bottom: 100}}>
            <span>
                <span
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                    className={classes.hovering}>
                        {toolTipProps.translated}
                    {
                        isHovering &&
                        // @ts-ignore
                        <DemoFrame frameStyles={frameStyles}>
                            <TranslationCard original={toolTipProps.original} translated={toolTipProps.translated}
                                             updateModal={setModalVisibilityCallback}/>
                        </DemoFrame>
                    }
                  </span>
                <ModalEnvelope isOpen={isModalOpen} closeCallback={setModalVisibilityCallback}
                               original={toolTipProps.original} translated={toolTipProps.translated}/>
            </span>
    </VisibilitySensor>;
};

export default WordHovering;
