import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Grid, TextField, Typography, Box, Badge, Button, ButtonBase} from "@material-ui/core";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";

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
        paper: {
            position: 'absolute',
            width: 380,
            maxWidth: 380,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 3, 3),
        },
        margin: {
            width: '100%'
        }
    }),
);

type ReportErrorModalProps = {
    original: string,
    translated: string,
    reportError?: boolean,
    feedback?: boolean
}

const ReportErrorModal = (reportErrorModalProps: ReportErrorModalProps) => {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const [value, setValue] = React.useState('1');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const modalContent = (
            <div style={modalStyle} className={classes.paper}>
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                >
                    <Grid item xs={11} >
                        <Typography variant="h5" color="primary">
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
                <Typography variant="body1">
                    Por favor ayudanos a mejorar dandonos más datos del error.
                </Typography>
                <br/>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="errorOptions" name="errorOptions" onChange={handleChange}>
                        <FormControlLabel value="1" control={<Radio color="primary"  />}  label="Error ortográfico" />
                        <FormControlLabel value="2" control={<Radio color="primary" />}  label="Error gramatical" />
                        <FormControlLabel value="3" control={<Radio color="primary" />}  label="La traducción no tiene sentido en este contexto" />
                        <FormControlLabel value="4" control={<Radio color="primary" />}  label="Otros" />
                    </RadioGroup>
                </FormControl>
                <TextField
                    id="outlined-full-width"
                    placeholder="¿Algun detalle adicional?"
                    helperText="Opcional"
                    fullWidth
                    multiline={true}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
            <br/>
                    <Badge color="primary" className={classes.margin} >
                        <Button variant="contained" fullWidth color="primary">Enviar</Button>
                    </Badge>

            </div>
    );

    return (
        <div>
            {
                reportErrorModalProps.reportError &&
                <IconButton  size="small" title="Report error" onClick={handleOpen}>
                    <ReportProblemIcon color="primary" />
                </IconButton>
            }
            {
                reportErrorModalProps.feedback &&
                <Button size="small" color="primary" onClick={handleOpen}>
                    Feedback
                </Button>
            }
            <Modal
                open={open}
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