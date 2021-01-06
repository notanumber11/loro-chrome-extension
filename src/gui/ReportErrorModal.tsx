import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Grid, TextField, Typography, Box, Badge, Button} from "@material-ui/core";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import ReportErrorAPI from "../external/reportErrorAPI";
import Alert from "@material-ui/lab/Alert";
import {AlertTitle} from "@material-ui/lab";

function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper_981: {
            position: 'absolute',
            width: 380,
            maxWidth: 380,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 3, 3),
        },
        button: {
            width: '100%'
        },
        titleTypography: {
            fontSize: 24,
        },
        bodyTypography: {
            fontSize: 16,
        },
        labelTypography: {
            fontSize: 8,
        },
        largeButton: {
            width: "100%"
        },
        largeIcon: {
            scale: 1,
            fontSize: "1.33em!important" as any
        },
    }),
);

type ReportErrorModalProps = {
    original: string,
    translated: string
}

const ReportErrorModal = (reportErrorModalProps: ReportErrorModalProps) => {
    const reportErrorAPI = new ReportErrorAPI();
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);

    const [state, setState] = React.useState({
        modalStyle: getModalStyle,
        textFiledValue: "",
        problemChoice: "4",
        showAlertSucess: false,
        showAlertError: false,
        open: false,
        webpage: window.location.href
    });

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({...state,
            problemChoice: (event.target as HTMLInputElement).value});
    };

    const handleOpen = () => {
        setState({...state,
            open: true});
    };

    const handleClose = () => {
        setState({...state,
            open: false});
    };

    const handletextFiledValueChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        setState({...state, textFiledValue: e.target.value });
    };

    const choicesToTypes : Record<string, string> = {
        "1" : "mispelling",
        "2" : "grammar",
        "3" : "translation",
        "4" : "other"
    };

    const send = () => {
        let booleanPromise = reportErrorAPI.reportError({
            translation: reportErrorModalProps.translated,
            web_page: state.webpage,
            type: choicesToTypes[state.problemChoice],
            word: reportErrorModalProps.original,
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

    const modalContent = (
            <div style={modalStyle} className={classes.paper_981}>
                {
                    state.showAlertSucess &&
                    <Alert severity="success">
                        <AlertTitle>Gracias por ayudarnos a mejorar !</AlertTitle>
                            Error reportado con éxito :)
                    </Alert>
                }
                {
                    state.showAlertError &&
                    <Alert severity="error">
                        <AlertTitle>
                            Error
                        </AlertTitle>
                        Problemas enviando el reporte :(
                    </Alert>
                }
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                >
                    <Grid item xs={11} >
                        <Typography variant="h5" color="primary" className={classes.titleTypography}>
                            Informa de un error
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
                <Typography variant="body1" className={classes.bodyTypography}>
                    Por favor ayudanos a mejorar dandonos más datos del problema.
                </Typography>
                <br/>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="errorOptions" name="errorOptions" onChange={handleRadioChange} value={state.problemChoice}>
                        <FormControlLabel value="1" control={<Radio color="primary"/>}  label={<Typography className={classes.bodyTypography} variant="body1">Error ortográfico </Typography>} />
                        <FormControlLabel value="2" control={<Radio color="primary"/>}  label={<Typography className={classes.bodyTypography} variant="body1">Error gramatical </Typography>}/>
                        <FormControlLabel value="3" control={<Radio color="primary"/>}  label={<Typography className={classes.bodyTypography} variant="body1">La traducción no tiene sentido en este contexto </Typography>}/>
                        <FormControlLabel value="4" control={<Radio color="primary"/>}  label={<Typography className={classes.bodyTypography} variant="body1">Otros </Typography>}/>
                    </RadioGroup>
                </FormControl>
                <TextField
                    id="outlined-full-width"
                    label="Página web"
                    fullWidth
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                        classes: {
                            input: classes.bodyTypography
                        }
                    }}
                    variant="outlined"
                    value = {state.webpage}
                />
                <TextField onChange={handletextFiledValueChange}
                    id="outlined-full-width"
                    placeholder="¿Algun detalle adicional?"
                    label={<Typography className={classes.bodyTypography} variant="body1">Opcional </Typography>}
                    fullWidth
                    multiline={true}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true
                    }}
                    InputProps={{
                        classes: {
                            input: classes.bodyTypography
                        }
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

    return (
        <div>
            {
                <IconButton  className={classes.largeButton} size="small" title="Report error" onClick={handleOpen}>
                    <ReportProblemIcon className={classes.largeIcon} color="primary" />
                </IconButton>
            }
            <Modal
                open={state.open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {modalContent}
            </Modal>
        </div>
    );
};

export default ReportErrorModal;