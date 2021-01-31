import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import Alert from "@material-ui/lab/Alert";
import {AlertTitle} from "@material-ui/lab";
import {Badge, Box, Button, Grid, TextField, Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import ReportErrorAPI from "../external/reportErrorAPI";

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
    }
}));

interface ModalContentProps {
    closeModal: () => void;
    original: string,
    translated: string
}

export default function ModalContent(props: ModalContentProps) {
    const classes = useStyles();

    const onModalClose = () => {
        props.closeModal();
    };

    const reportErrorAPI = new ReportErrorAPI();

    const [state, setState] = React.useState({
        textFiledValue: "",
        problemChoice: "4",
        showAlertSucess: false,
        showAlertError: false,
        webpage: window.location.href
    });

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            problemChoice: (event.target as HTMLInputElement).value
        });
    };

    const handletextFiledValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({...state, textFiledValue: e.target.value});
    };

    const choicesToTypes: Record<string, string> = {
        "1": "mispelling",
        "2": "grammar",
        "3": "translation",
        "4": "other"
    };

    const send = () => {
        let booleanPromise = reportErrorAPI.reportError({
            translation: props.translated,
            web_page: state.webpage,
            type: choicesToTypes[state.problemChoice],
            word: props.original,
            other_description: state.textFiledValue,
        });
        setTimeout(function () {
            let s = true;
            setState({
                ...state,
                showAlertSucess: s,
                showAlertError: !s,
                textFiledValue: s ? "" : state.textFiledValue
            });
            props.closeModal();
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
                    <Grid item xs={11}>
                        <Typography variant="h5" color="primary">
                            Informa de un error
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
                <Typography variant="body1">
                    Por favor ayudanos a mejorar dandonos más datos del problema.
                </Typography>
                <br/>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="errorOptions" name="errorOptions" onChange={handleRadioChange}
                                value={state.problemChoice}>
                        <FormControlLabel value="1" control={<Radio color="primary"/>}
                                          label={<Typography variant="body1">Error ortográfico </Typography>}/>
                        <FormControlLabel value="2" control={<Radio color="primary"/>}
                                          label={<Typography variant="body1">Error gramatical </Typography>}/>
                        <FormControlLabel value="3" control={<Radio color="primary"/>}
                                          label={<Typography variant="body1">La traducción no tiene sentido en este
                                              contexto </Typography>}/>
                        <FormControlLabel value="4" control={<Radio color="primary"/>}
                                          label={<Typography variant="body1">Otros </Typography>}/>
                    </RadioGroup>
                </FormControl>
                <TextField
                    id="outlined-full-width"
                    label="Página web"
                    fullWidth
                    margin="normal"
                    InputProps={{
                        readOnly: true
                    }}
                    variant="outlined"
                    value={state.webpage}
                />
                <TextField onChange={handletextFiledValueChange}
                           id="outlined-full-width"
                           placeholder="¿Algun detalle adicional?"
                           label={<Typography variant="body1">Opcional </Typography>}
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
                    <Button variant="contained" fullWidth color="primary" onClick={send}>Enviar</Button>
                </Badge>
            </div>
        </div>
    );
}
