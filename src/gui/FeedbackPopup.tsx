import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {Grid, Typography, Box, Badge, Button, ButtonBase, TextField} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ReportErrorAPI from "../external/reportErrorAPI";
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            minWidth: 380,
            maxWidth: 380,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 3, 3),
        },
        button: {
            width: '100%'
        }
    }),
);

class FeedbackPopupProps {
    callback:any
}

const FeedbackPopup = (feedbackPopupProps: FeedbackPopupProps) => {
    const reportErrorAPI = new ReportErrorAPI();
    const classes = useStyles();

    const [state, setState] = React.useState({
        textFiledValue: "",
        showAlertSucess: false,
        showAlertError: false
    });

    const handleTextFieldChange = (e)=> {
        setState({...state, textFiledValue: e.target.value });
    };

    const handleClose = () => {
        feedbackPopupProps.callback(true, false);
    };

    const send = () => {
        let booleanPromise = reportErrorAPI.reportError({
            type: "testType",
            translation: "testTranslation",
            web_page: "test",
            word: "test",
            other_description: state.textFiledValue,
        });
        booleanPromise.then(s => {
            setState({...state,
                showAlertSucess: s,
                showAlertError: !s,
                textFiledValue: s ? "" : state.textFiledValue});
        }).catch(e => {
            console.log("Problems calling reportError api: " + e);
            setState({...state, showAlertSucess: false, showAlertError: true });
        });
    };

    return (
        <div className={classes.paper}>
            {
                state.showAlertSucess &&  <Alert severity="success">Mensaje enviado con éxito!</Alert>
            }
            {
                state.showAlertError && <Alert severity="error">Error enviando el mensaje </Alert>
            }
            <Grid
                container
                direction="row"
                alignItems="center"
            >
                <Grid item xs={11} >
                    <Typography variant="h5" color="primary">
                        Contacto
                    </Typography>
                </Grid>
                <Grid item xs={1}  >
                    <Box display="flex" flexDirection="row-reverse">
                        <IconButton aria-label="close" onClick={handleClose}>
                            <CloseIcon color="primary" />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
            <Divider variant="fullWidth" />
            <br/>
            <Typography variant="body1">
                Si tienes un problema o quieres ayudarnos a mejorar no dudes en contactarnos :)
            </Typography>
            <TextField onChange={handleTextFieldChange}
                id="outlined-full-width"
                placeholder="¿Algun detalle adicional?"
                rows={2}
                fullWidth
                multiline={true}
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
                value = {state.textFiledValue}
            />
            <br/>
            <Badge color="primary" className={classes.button} >
                <Button variant="contained" fullWidth color="primary" onClick={send}>Enviar</Button>
            </Badge>

        </div>
    );
};

export default FeedbackPopup;