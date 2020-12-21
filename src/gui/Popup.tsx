import React from 'react';
import FeedbackPopup from "./FeedbackPopup";
import DefaultPopup from "./DefaultPopup";

export default function Popup() {

    const [state, setState] = React.useState({
        showDefault: true,
        showFeedback: false
    });

    const popUpToSee = (showDefault:boolean, showFeedback:boolean) => {
        setState({...state, showDefault: showDefault, showFeedback: showFeedback});
    };


    return (
        <div>
            {
                state.showDefault &&
                <DefaultPopup callback={popUpToSee}/>
            }
            {
                state.showFeedback &&
                <FeedbackPopup callback={popUpToSee}/>
            }
        </div>
    )
}
