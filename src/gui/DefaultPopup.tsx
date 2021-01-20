import React, {useEffect} from 'react';
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
import {Grid, InputLabel, Link, MenuItem, Select} from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import GuiProxy from "./GuiProxy";
import TransferendumConfig from "../TransferendumConfig";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 380,
        maxWidth: 380,
        margin: 0
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    formControl: {
        button: theme.spacing(3),
    },
    cardcontent: {
        padding: 0,
        "&:last-child": {
            paddingBottom: 0
        }
    },
    grid: {
        flexGrow: 1,
        padding: "10px"
    },
    formChooseLanguage: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    switchText: {}
}));

interface DefaultPopupProps {
    closeCallback: () => void;
}

const DefaultPopup = (defaultPopupProps: DefaultPopupProps) => {
    const classes = useStyles();
    const [difficultyState, setDifficultyState] = React.useState("many");
    const [languageState, setLanguageState] = React.useState("en");
    const [loroSwitchState, setLoroSwitchState] = React.useState(false);
    const guiProxy = TransferendumConfig.instance.guiProxy;
    // Run function after component is mounted: https://stackoverflow.com/questions/54792722/on-react-how-can-i-call-a-function-on-component-mount-on-a-functional-stateless
    useEffect(() => {
        guiProxy.getFromLocalStore(TransferendumConfig.DIFFICULTY_KEY, "less").then(
            val => setDifficultyState(val.toString())
        );
        guiProxy.getFromLocalStore(TransferendumConfig.LORO_SWITCH_KEY, "true").then(
            val => setLoroSwitchState(val == "true")
        );
        guiProxy.getFromLocalStore(TransferendumConfig.LANGUAGE_KEY, "en").then(
            val => setLanguageState(val.toString())
        );
    }, []);

    const difficultyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDifficultyState((event.target as HTMLInputElement).value);
        guiProxy.setOnLocalStore(TransferendumConfig.DIFFICULTY_KEY, (event.target as HTMLInputElement).value);
        guiProxy.reloadCurrentTab();
    };

    const toucanSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoroSwitchState(event.target.checked);
        guiProxy.setOnLocalStore(TransferendumConfig.LORO_SWITCH_KEY, event.target.checked.toString());
        guiProxy.reloadCurrentTab();
    };

    const onLanguageChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        let value = event.target.value as string;
        setLanguageState(value);
        guiProxy.setOnLocalStore(TransferendumConfig.LANGUAGE_KEY, value);
        guiProxy.reloadCurrentTab();
    };

    return (
        <div>
            {
                <Card className={classes.root} variant="outlined">
                    <CardHeader
                        avatar={
                            <Avatar alt="loro" src={TransferendumConfig.instance.guiProxy.getWebAccessibleResource("icon-default-popup.png")}>
                                loro
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="close" onClick={defaultPopupProps.closeCallback}>
                                <CloseIcon color="primary"/>
                            </IconButton>
                        }
                        title="Aprende un new lenguage"
                        subheader="Sin darte cuenta :)"
                    />
                    <Divider variant="middle"/>
                    <CardContent>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <Typography variant="body1" color="primary">
                                Escoge dificultad:
                            </Typography>
                            <RadioGroup aria-label="difficultOptions" name="difficultOptions"
                                        onChange={difficultyChange}>
                                <FormControlLabel
                                    control={<Radio color="primary"/>}
                                    value="less"
                                    checked={difficultyState == "less"}
                                    label="Menos (Pocas y fáciles)"
                                />
                                <FormControlLabel
                                    control={<Radio color="primary"/>}
                                    value="more"
                                    checked={difficultyState == "more"}
                                    label="Más (Frequentes y más difíciles)"
                                />
                                <FormControlLabel
                                    control={<Radio color="primary"/>}
                                    value="many"
                                    checked={difficultyState == "many"}
                                    label="Muchas (Abundantes y complicadas)"
                                />
                            </RadioGroup>
                            <br/>
                        </FormControl>
                        <Divider variant="middle"/>
                        <Box display="flex" alignItems="center" justifyContent="flex-start">
                            <Box p={1}>
                                <Typography variant="body1" color="primary">
                                    Quiero aprender:
                                </Typography>
                            </Box>
                            <Box p={1}>
                                <FormControl variant="outlined" className={classes.formChooseLanguage}>
                                    <Select
                                        onChange={onLanguageChange}
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={languageState}
                                    >
                                        <MenuItem value={"en"}>English</MenuItem>
                                        <MenuItem value={"pl"}>Polski</MenuItem>
                                        <MenuItem value={"es"}>Español</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                        <Divider variant="middle"/>
                        <div className={classes.grid}>
                            <Grid container
                                  direction="row"
                                  justify="flex-start"
                                  alignItems="flex-start">
                                <Grid item xs={3}>
                                    <Switch
                                        color="primary"
                                        checked={loroSwitchState}
                                        onChange={toucanSwitchChange}
                                        name="toucanSwitch"
                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                    />
                                </Grid>
                                <Grid item xs={9}>
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
                                                loroSwitchState &&
                                                <Typography color="primary" variant="h6">ON</Typography>
                                            }
                                            {
                                                !loroSwitchState &&
                                                <Typography color="primary" variant="h6">OFF</Typography>
                                            }
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {
                                            loroSwitchState &&
                                            <Typography variant="subtitle2">
                                                Necesitas apagar las traducciones un rato? Prueba apagando Loro :)
                                            </Typography>
                                        }
                                        {
                                            !loroSwitchState &&
                                            <Typography variant="subtitle2">
                                                Enciende Loro para ver traducciones de nuevo :)
                                            </Typography>
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                        <Divider variant="middle"/>
                    </CardContent>
                    <Box display="flex" flexDirection="row-reverse">
                        <Box p={1}>
                            <Typography variant="h6" style={{marginRight: "1em"}}>
                                <Link href="https://forms.gle/BRDx93xoxfVjQ8x1A" target="_blank">
                                    Contacto
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Card>
            }
        </div>

    );
};
export default DefaultPopup;
