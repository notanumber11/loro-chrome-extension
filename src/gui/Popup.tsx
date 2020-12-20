import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';
import {Grid} from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import ReportErrorModal from "./ReportErrorModal";
import Box from "@material-ui/core/Box";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 400,
        maxWidth: 400,
    },
    bigRoot: {
        minWidth: 500,
        maxWidth: 500,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    formControl: {
        margin: theme.spacing(3),
    },
    cardcontent: {
        padding: 0,
        "&:last-child": {
            paddingBottom: 0
        }
    },
    grid: {
        flexGrow: 1,
    },
    switchText: {
    }
}));

export default function Popup() {
    const classes = useStyles();

    const [state, setState] = React.useState({
        toucanSwitch: true,
        choice: "less"
    });

    const [value, setValue] = React.useState('less');
    const difficultyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Difficulty change !");
        console.log("The value is" + (event.target as HTMLInputElement).value);
        setValue((event.target as HTMLInputElement).value);
        console.log(state);
        setState({ ...state, choice: (event.target as HTMLInputElement).value });
    };

    const handleClick = () => {
        console.log('The close button was clicked.');
        window.close();
    };

    const toucanSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Switch change !");
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <Card className={classes.root} variant="outlined">
            <CardHeader
                avatar={
                    <Avatar  alt="loro" src="../icon48-mirror2.png">
                        loro
                    </Avatar>
                }
                action={
                    <IconButton aria-label="close" onClick={handleClick}>
                        <CloseIcon color="primary" />
                    </IconButton>
                }
                title="Aprende un nuevo language"
                subheader="Sin darte cuenta :)"
            />
            <Divider variant="middle" />
            <CardContent>
                <FormControl component="fieldset" className={classes.formControl}>
                    <Typography variant="body1" color="primary">
                        Escoge dificultad:
                    </Typography>
                    <RadioGroup aria-label="difficultOptions" name="difficultOptions" onChange={difficultyChange}>
                        <FormControlLabel
                            control={<Radio color = "primary" />}
                            value="less"
                            checked={state.choice == "less"}
                            label="Menos (Pocas y sútiles)"
                        />
                        <FormControlLabel
                            control={<Radio color = "primary" />}
                            value="more"
                            label="Más (Frequentes y obvias)"
                        />
                        <FormControlLabel
                            control={<Radio color = "primary" />}
                            value="many"
                            label="Muchas (Muchas y abundantes)"
                        />
                    </RadioGroup>
                </FormControl>
            <Divider variant="middle" />
            <div className={classes.grid}>
                <Grid container
                      direction="row"
                      justify="flex-start"
                      alignItems="flex-start">
                    <Grid item xs={12}>
                        <br/>
                    </Grid>
                    <Grid item xs={3} >
                        <Switch
                            color="primary"
                            checked={state.toucanSwitch}
                            onChange={toucanSwitchChange}
                            name="toucanSwitch"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                    </Grid>
                    <Grid item  xs={9}>
                        <Grid container
                              direction="row"
                              justify="flex-start"
                              alignItems="flex-start">
                            <Grid item xs={5}>
                                <Typography variant="h6">
                                    Loro esta:&nbsp;
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                {
                                    state.toucanSwitch &&
                                    <Typography color="primary" variant="h6">ON</Typography>
                                }
                                {
                                    !state.toucanSwitch &&
                                    <Typography color="primary" variant="h6">OFF</Typography>
                                }
                            </Grid>
                        </Grid>
                        <Grid item xs={9}>
                            {
                                state.toucanSwitch &&
                                <Typography variant="subtitle2">
                                    Necesitas apagar las traducciones un rato? Prueba apagando Loro :)
                                </Typography>
                            }
                            {
                                !state.toucanSwitch &&
                                <Typography variant="subtitle2" >
                                    Enciende Loro para ver traducciones de nuevo :)
                                </Typography>
                            }
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <br/>
                    </Grid>
                </Grid>
            </div>
            <Divider variant="middle" />
            </CardContent>
            <Box display="flex" flexDirection="row-reverse">
                <Box p={1}>
                    <ReportErrorModal original={null} translated={null} feedback={true}/>
                </Box>
            </Box>
        </Card>
    );
}
