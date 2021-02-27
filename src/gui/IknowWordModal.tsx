import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import {Badge, Box, Button, Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {useTranslation} from "react-i18next";
import TransferendumConfig from "../TransferendumConfig";
import DoneIcon from "@material-ui/icons/Done";
import i18n from "../i18n"

if (i18n == null) {
    console.log("Problems loading i18n");
}

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        position: 'relative',
        width: 380,
        maxWidth: 380,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 3, 3)
    },
    button: {
        width: '100%'
    },
    loroIcon: {
        width: "200px",
        height: "200px"
    },
    congrats: {
        color: theme.palette.secondary.light
    }
}));

interface IknowWordModalProps {
    closeModalCallback: () => void;
    original: string,
    translated: string
}

export default function IknowWordModal(props: IknowWordModalProps) {
    const {t, i18n} = useTranslation();
    const classes = useStyles();

    const onModalClose = () => {
        props.closeModalCallback();
    };
    const iconSrc = TransferendumConfig.instance.guiProxy.getWebAccessibleResource("loro.svg");

    return (
        <div>
            <div className={classes.paper}>
                <Box display="flex" flexDirection="row-reverse">
                    <IconButton aria-label="close" onClick={onModalClose}>
                        <CloseIcon color="primary"/>
                    </IconButton>
                </Box>

                <Box justifyContent="center" alignItems="center">
                    <Typography variant="h4" className={classes.congrats} align="center">
                        Congratulations
                    </Typography>
                </Box>

                <Box justifyContent="center" alignItems="center">
                    <Typography variant="h5" color="primary" align="center">
                        You have learnt a new word !
                    </Typography>
                </Box>

                <Box display="flex" justifyContent="center" m={1} p={1}>
                    <img className={classes.loroIcon} src={iconSrc} alt="loro icon"/>
                </Box>

                <Box justifyContent="center" alignItems="center" m={1} p={2}>
                    <Typography variant="body1" align="center">
                        By clicking <DoneIcon></DoneIcon> you are showing to us that you already know the word so
                        it will appear less often while you are browsing.
                    </Typography>
                </Box>

                <Box justifyContent="center" alignItems="center" pr={"2em"} pl={"2em"}>
                    <Badge color="primary" className={classes.button}>
                        <Button variant="contained" fullWidth color="primary" onClick={onModalClose}>Continue browsing</Button>
                    </Badge>
                </Box>
            </div>
        </div>
    );
}
