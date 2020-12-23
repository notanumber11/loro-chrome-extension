import React from 'react';
import FeedbackPopup from "./FeedbackPopup";
import DefaultPopup from "./DefaultPopup";
import TransferendumConfig from "../TransferendumConfig";

export default function Popup() {

    const [state, setState] = React.useState({
        showDefault: true,
        showFeedback: false
    });

    const popUpToSee = (showDefaultPopup:boolean, showFeedbackPopup:boolean) => {
        setState({...state, showDefault: showDefaultPopup, showFeedback: showFeedbackPopup});
    };


    return (
        <div>
            {
                state.showDefault &&
                <DefaultPopup callback={popUpToSee} guiProxy={TransferendumConfig.transferendumConfig.guiProxy}/>
            }
            {
                state.showFeedback &&
                <FeedbackPopup callback={popUpToSee}/>
            }
        </div>
    )
}
