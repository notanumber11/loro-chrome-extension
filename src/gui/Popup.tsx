import React from 'react';
import ContactPopup from "./ContactPopup";
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
                <DefaultPopup callback={popUpToSee} guiProxy={TransferendumConfig.instance.guiProxy}/>
            }
            {
                state.showFeedback &&
                <ContactPopup callback={popUpToSee}/>
            }
        </div>
    )
}
