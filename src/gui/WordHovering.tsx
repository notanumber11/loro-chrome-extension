import React from 'react';
import TranslationCard from "./TranslationCard";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import VisibilitySensor from "react-visibility-sensor";

const useStyles = makeStyles((theme: Theme) =>
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

    let hasBeenSeen = false;

    const [state, setState] = React.useState({
        isHovering: false
    });

    const handleMouseHover = ()=> {
        setState(toggleHoverState);
    };

    const toggleHoverState = ()=> {
        return {
            isHovering: !state.isHovering,
        };
    };

    const onChange = (isVisible:boolean) => {
        if (!hasBeenSeen){
            // console.log('Element %s is now %s', toolTipProps.translated,  isVisible ? 'visible' : 'hidden');
            hasBeenSeen = true;
        }
        // Save to local storage
    };

    return (
        // Offset bottom since we want to count the words watched by an user and
        // people tend to scroll down when they want to read more.
        <VisibilitySensor onChange={onChange} offset={{bottom:100}}>
            <span
                onMouseEnter={handleMouseHover}
                onMouseLeave={handleMouseHover}
                className={classes.hovering}>
                    {toolTipProps.translated}
                {
                    state.isHovering &&
                    <TranslationCard original={toolTipProps.original} translated={toolTipProps.translated}/>
                }
              </span>
        </VisibilitySensor>

    );
};

export default WordHovering;
