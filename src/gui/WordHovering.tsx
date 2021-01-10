import React from 'react';
import TranslationCard from "./TranslationCard";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import VisibilitySensor from "react-visibility-sensor";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";
import DemoFrame from "./DemoFrame";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        hovering: {
            backgroundColor: "#def8ff",
            position: "relative",
            display: "inline-block",
            cursor: "pointer"
        },
        // Name needs to be unique since it can collide with other in the webpage
        containerFrame173: {
            display: "inline",
            position: "relative",
            overflow: "hidden",
            paddingTop: "56.25%"
        }
    })
);

type ToolTipProps = {
    original: string
    translated: string
}

const WordHovering = (toolTipProps: ToolTipProps) => {
    const classes = useStyles();

    const [state, setState] = React.useState({
        isHovering: false
    });

    const turnOn = ()=> {
        setState({
            isHovering: true
        });
    };

    const onChange = (isVisible:boolean) => {
        if(isVisible) {
            console.log("Element visible: " + toolTipProps.translated);
        }
    };

        const turnOff = ()=> {
        setState({
            isHovering: false
        });
    };

    // Based on: https://blog.theodo.com/2018/01/responsive-iframes-css-trick/
    return (
        <VisibilitySensor onChange={onChange} offset={{bottom:100}}>
            <span className={classes.containerFrame173}>
                &nbsp;
                <span
                    onMouseEnter={turnOn}
                    onMouseLeave={turnOff}
                    className={classes.hovering}>
                         {toolTipProps.translated}
                    {
                        state.isHovering &&
                        <DemoFrame>
                            <TranslationCard original={toolTipProps.original} translated={toolTipProps.translated}/>
                        </DemoFrame>
                    }
                  </span>
            </span>
        </VisibilitySensor>
    );
};

export default WordHovering;
