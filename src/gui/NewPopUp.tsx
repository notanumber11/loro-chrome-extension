import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import {Grid} from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 345,
        maxWidth: 345,
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

const PinkTextTypography  = withStyles({
    root: {
        color: "#e33371"
    }
})(Typography);

export default function NewPopUp() {
    const classes = useStyles();

    const [state, setState] = React.useState({
        less: true,
        more: false,
        many: false,
        checkedA: true,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const { less, more, many } = state;
    const error = [less, more, many].filter((v) => v).length !== 2;


    return (
        <Card className={classes.root} variant="outlined">
            <CardHeader
                avatar={
                    <Avatar  alt="loro" src="../icon48-mirror2.png">
                        loro
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <CloseIcon />
                    </IconButton>
                }
                title="Aprende un nuevo language"
                subheader="Sin darte cuenta :)"
            />
            <Divider variant="middle" />
            <CardContent>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Choose difficulty:</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={less} onChange={handleChange} name="gilad" />}
                            label="Menos (Infrequentes y sútiles )"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={more} onChange={handleChange} name="jason" />}
                            label="Más (Frequentes y obvias)"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={many} onChange={handleChange} name="antoine" />}
                            label="Many (Muchas y claras)"
                        />
                    </FormGroup>
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
                    <Grid item >
                        <Switch
                            checked={state.checkedA}
                            onChange={handleChange}
                            name="checkedA"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                    </Grid>
                    <Grid item >
                        <Grid container
                              direction="row"
                              justify="flex-start"
                              alignItems="flex-start">
                            <Grid item >
                                <Typography variant="h6">
                                    Loro esta:&nbsp;
                                </Typography>
                            </Grid>
                            <Grid item >
                                <PinkTextTypography variant="h6">ON</PinkTextTypography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <br/>
                    </Grid>
                </Grid>
            </div>
            <Divider variant="middle" />
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
                <Button size="small" color="primary">
                    Dashboard
                </Button>
                <Button size="small" color="primary">
                    Feedback
                </Button>
            </CardActions>
        </Card>
    );
}
