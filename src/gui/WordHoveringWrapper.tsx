import React from 'react';
import WordHovering from "./WordHovering";
import { StylesProvider, jssPreset } from '@material-ui/core';
import { create } from 'jss';

type ToolTipProps = {
    original: string
    translated: string
    node: any
}

const WordHoveringWrapper = (toolTipProps: ToolTipProps) => {
    const jss = create({
        ...jssPreset(),
        insertionPoint: toolTipProps.node
    });

    return (
        <span>
{/*
            Based on: https://stackoverflow.com/questions/51832583/react-components-material-ui-theme-not-scoped-locally-to-shadow-dom
*/}
            <StylesProvider jss={jss} sheetsManager={new Map()}>
                <WordHovering original={toolTipProps.original} translated={toolTipProps.translated}/>
            </StylesProvider>
          </span>
    );
};

export default WordHoveringWrapper;
