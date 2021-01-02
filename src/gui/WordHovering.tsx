import React from 'react';
import TranslationCard from "./TranslationCard";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

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

    return (
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
    );
};

export default WordHovering;
