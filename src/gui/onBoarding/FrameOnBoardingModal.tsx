import React from 'react';
import DemoFrame from "../DemoFrame";
import shadows from "@material-ui/core/styles/shadows";
import {Modal, Paper} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import OnBoardingStepper from "./OnBoardingStepper";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import TransferendumConfig from "../../TransferendumConfig";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: "none"
        },
        '&:hover': {
            outline: 'none',
        },
        '&.Mui-selected': {
            outline: 'none',
        }
    }),
);

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
    transform: "translate(-50%, -50%)"
};

interface ModalEnvelopeProps {
    closeCallback: () => void,
    isOpen: boolean
}

export default function FrameOnBoardingModal(props: ModalEnvelopeProps) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
        props.closeCallback();
        TransferendumConfig.instance.guiProxy.setOnLocalStore(TransferendumConfig.LORO_JUST_INSTALLED_KEY, false);
    };

    // @ts-ignore
    return (
        <div style={{position: "relative", display: "inline"}}>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <div>
                    {
                        open &&
                        <DemoFrame frameStyles={frameStyles}>
                            <OnBoardingStepper callbackCloseModal={handleClose}/>
                        </DemoFrame>
                    }
                </div>
            </Modal>
        </div>);
}
