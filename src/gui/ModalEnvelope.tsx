import React from 'react';
import DemoFrame from "./DemoFrame";
import shadows from "@material-ui/core/styles/shadows";
import {Modal} from "@material-ui/core";

const frameStyles = {
    width: "0px",
    height: "0px",
    border: "none",
    padding: "none",
    boxShadow: shadows[1],
    zIndex: 1,
    // Based on: https://blog.theodo.com/2018/01/responsive-iframes-css-trick/
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white"
};

interface ModalEnvelopeProps {
    closeModalCallback: () => void,
    isOpen: boolean,
    original: string,
    translated: string,
    children: React.ReactNode
}

export default function ModalEnvelope(props: ModalEnvelopeProps) {
    const [hoveringModal, setHoveringModal] = React.useState(false);

    const onModalClose = () => {
        props.closeModalCallback();
    };

    const onModalClickOut = () => {
        if (!hoveringModal) {
            onModalClose();
        }
    };

    // @ts-ignore
    return (
        <div style={{position: "relative", display: "inline"}}>
            <Modal open={props.isOpen}
                   onClick={onModalClickOut}>
                {
                    <div>
                        {/*// @ts-ignore*/}
                        <DemoFrame frameStyles={frameStyles}>
                            <div onPointerOver={() => setHoveringModal(true)}
                                 onPointerOut={() => setHoveringModal(false)}>
                                {props.children}
                            </div>
                        </DemoFrame>
                    </div>
                }
            </Modal>
        </div>);
}
