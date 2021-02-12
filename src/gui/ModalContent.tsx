import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import Alert from "@material-ui/lab/Alert";
import {AlertTitle} from "@material-ui/lab";
import {Badge, Box, Button, Grid, TextField, Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import ReportErrorAPI from "../external/reportErrorAPI";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles((theme:Theme) => ({
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
    words: {
        color: theme.palette.primary.main,
        fontSize: "1.2em"
    },
    wordsTitles: {
        fontSize: "1.2em"
    }
}));

interface ModalContentProps {
    closeModal: () => void;
    original: string,
    translated: string
}

export default function ModalContent(props: ModalContentProps) {
    const { t, i18n } = useTranslation();
    const classes = useStyles();

    const onModalClose = () => {
        props.closeModal();
    };

    const reportErrorAPI = new ReportErrorAPI();

    const [state, setState] = React.useState({
        textFiledValue: "",
        showAlertSucess: false,
        showAlertError: false,
        webpage: window.location.href,
        showContent: true
    });

    const handletextFiledValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({...state, textFiledValue: e.target.value});
    };

    const send = () => {
        let booleanPromise = reportErrorAPI.reportError({
            translation: props.translated,
            web_page: state.webpage,
            type: "removedFromGUI",
            word: props.original,
            other_description: state.textFiledValue,
        });
        setTimeout(function () {
            let s = true;
            setState({
                ...state,
                showAlertSucess: s,
                showAlertError: !s,
                textFiledValue: s ? "" : state.textFiledValue,
                showContent: false
            });
            }, 500);
        booleanPromise.then(s => {
            // TODO: Make the api faster so report error works properly
/*            setState({
                ...state,
                showAlertSucess: s,
                showAlertError: !s,
                textFiledValue: s ? "" : state.textFiledValue
            });*/
        }).catch(e => {
            console.log("Problems calling reportError api: " + e);
            setState({...state, showAlertSucess: false, showAlertError: true});
        });
    };

    return (
        <div>
            <div className={classes.paper}>
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                >
                    <Grid item xs={11}>
                        <Typography variant="h5" color="primary">
                            {t("Inform about an error")}
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Box display="flex" flexDirection="row-reverse">
                            <IconButton aria-label="close" onClick={onModalClose}>
                                <CloseIcon color="primary"/>
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
                <Divider variant="fullWidth"/>
                <br/>
                {
                    state.showAlertSucess &&
                    <Alert severity="success">
                        <AlertTitle>{t("Thanks report")}</AlertTitle>
                        {t("Error reported")}
                    </Alert>
                }
                {
                    state.showAlertError &&
                    <Alert severity="error">
                        <AlertTitle>
                            Error
                        </AlertTitle>
                        {t("Problems sending report")}
                    </Alert>
                }
                {state.showContent &&
                    <div>
                    <Typography className={classes.wordsTitles} variant="body1">{t("Original")}</Typography>
                    <Typography className={classes.words} variant="body1">{"- " + props.original}</Typography>
                    <Typography className={classes.wordsTitles} variant="body1">{t("Translated word")} </Typography>
                    <Typography className={classes.words} variant="body1">{"- " + props.translated}</Typography>
                    <TextField
                        id="outlined-full-width"
                        label={t("webpage")}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={state.webpage}
                    />
                    <TextField onChange={handletextFiledValueChange}
                               id="outlined-full-width"
                               placeholder={t("Additional details")}
                               label={<Typography variant="body1">{t("Optional")} </Typography>}
                               fullWidth
                               multiline={true}
                               margin="normal"
                               InputLabelProps={{
                                   shrink: true
                               }}
                               variant="outlined"
                               value={state.textFiledValue}
                    />
                    <br/>
                    <Badge color="primary" className={classes.button}>
                        <Button variant="contained" fullWidth color="primary" onClick={send}>{t("Send")}</Button>
                    </Badge>
                </div>
                }
            </div>
        </div>
    );
}
