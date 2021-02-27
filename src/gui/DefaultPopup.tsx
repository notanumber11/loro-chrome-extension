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
import {Button, Grid, Link, MenuItem, Select} from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TransferendumConfig from "../TransferendumConfig";
import { useTranslation } from 'react-i18next';
import i18n from "../i18n"
import i18next from "i18next";
if (i18n == null) {
    console.log("Problems with i18n, it is null");
}

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
    smallTitle: {
        fontSize: "1.1rem",
        color: theme.palette.primary.main
    },
    webpage: {
        color: theme.palette.primary.main
    }
}));

interface DefaultPopupProps {
    closeCallback: () => void;
}

const DefaultPopup = (defaultPopupProps: DefaultPopupProps) => {
    const { t, i18n } = useTranslation();
    const classes = useStyles();
    const [difficultyState, setDifficultyState] = React.useState("many");
    const [webpageState, setWebpage] = React.useState("webpage");
    const [languageState, setLanguageState] = React.useState("en");
    const [loroSwitchState, setLoroSwitchState] = React.useState(false);
    const [runningOnWebpageSwitchState, setRunningOnWebpageSwitchState] = React.useState(false);
    const [items, setItems] = React.useState([<MenuItem key={-1}></MenuItem>]);
    const guiProxy = TransferendumConfig.instance.guiProxy;

    // Run function after component is mounted: https://stackoverflow.com/questions/54792722/on-react-how-can-i-call-a-function-on-component-mount-on-a-functional-stateless
    useEffect(() => {
        guiProxy.getFromLocalStore(TransferendumConfig.DIFFICULTY_KEY, "less").then(
            val => setDifficultyState(val.toString())
        );
        guiProxy.getFromLocalStore(TransferendumConfig.LORO_SWITCH_KEY, "true").then(
            val => setLoroSwitchState(val == "true")
        );
        guiProxy.getFromLocalStore(TransferendumConfig.MOTHER_TONGUE_KEY, "en").then(
            val => {
                setItems(getAvailableLanguages(val.toString()));
                i18next.changeLanguage(val.toString());
            }
        );
        guiProxy.getFromLocalStore(TransferendumConfig.LANGUAGE_KEY, "es").then(
            val => setLanguageState(val.toString())
        );
        obtainUrl();
    }, []);

    function getAvailableLanguages(motherTongue:string) {
        const items = [];
        let val = 0;
        for (let el of TransferendumConfig.AVAILABLE_LANGUAGES.get(motherTongue)!) {
            let languageLong = TransferendumConfig.LANGUAGE_CODE_TO_LANGUAGE.get(el);
            items.push(<MenuItem key={el} value={el}>{languageLong}</MenuItem>);
            val+=1;
        }
        return items;
    }

    function updateIsRunningWebpageSwitchState(currentUrl: string) {
        guiProxy.getFromLocalStore(TransferendumConfig.DENIED_USER_WEBPAGES_KEY, []).then((val) => {
                // @ts-ignore
                let urls: Array<string> = val;
                let index = urls.indexOf(currentUrl);
                if (index == -1) {
                    setRunningOnWebpageSwitchState(true);
                } else {
                    setRunningOnWebpageSwitchState(false);
                }
            }
        );
    }

    const difficultyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDifficultyState((event.target as HTMLInputElement).value);
        guiProxy.setOnLocalStore(TransferendumConfig.DIFFICULTY_KEY, (event.target as HTMLInputElement).value);
        guiProxy.reloadCurrentTab();
    };

    const loroSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoroSwitchState(event.target.checked);
        guiProxy.setOnLocalStore(TransferendumConfig.LORO_SWITCH_KEY, event.target.checked.toString());
        guiProxy.reloadCurrentTab();
    };

    const runningOnWebpageSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let isAllowed = event.target.checked;
        setRunningOnWebpageSwitchState(isAllowed);
        guiProxy.getFromLocalStore(TransferendumConfig.DENIED_USER_WEBPAGES_KEY, []).then((val)=>
            {
                let currentUrl = webpageState;
                // @ts-ignore
                let urls:Array<string> = val;
                if (currentUrl) {
                    if (isAllowed) {
                        // Remove url
                        let index = 0;
                        while (index != -1) {
                            index = urls.indexOf(currentUrl);
                            urls.splice(index);
                        }
                    }
                    else {
                        // Append url
                        urls.push(currentUrl);
                    }
                    if (urls.length>=0) {
                        guiProxy.setOnLocalStore(TransferendumConfig.DENIED_USER_WEBPAGES_KEY, urls);
                    }
                }
            }
        );
        guiProxy.reloadCurrentTab();
    };

    const onLanguageChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        let value = event.target.value as string;
        setLanguageState(value);
        guiProxy.setOnLocalStore(TransferendumConfig.LANGUAGE_KEY, value);
        guiProxy.reloadCurrentTab();
    };

    const obtainUrl = () => {
        let currentUrl = null;
        if (chrome.tabs) {
            chrome?.tabs?.query({active: true, lastFocusedWindow: true}, tabs => {
                currentUrl = tabs?.[0]?.url;
                if (currentUrl) {
                    currentUrl = TransferendumConfig.formatUrl(currentUrl);
                    setWebpage(currentUrl);
                    updateIsRunningWebpageSwitchState(currentUrl);
                }
            });
        }
        else {
            currentUrl = window.location.href;
            currentUrl = TransferendumConfig.formatUrl(currentUrl);
            if (currentUrl) {
                setWebpage(currentUrl);
                updateIsRunningWebpageSwitchState(currentUrl);
            }
        }
        return currentUrl
    };

    return (
        <div>
            {
                <Card className={classes.root} variant="outlined">
                    <CardHeader
                        avatar={
                            <Avatar alt="loro"
                                    src={TransferendumConfig.instance.guiProxy.getWebAccessibleResource("icon-avatar.png")}>
                                loro
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="close" onClick={defaultPopupProps.closeCallback}>
                                <CloseIcon color="primary"/>
                            </IconButton>
                        }
                        title={t("Learn a new language")}
                        subheader={t("Without releasing")}
                    />
                    <Divider variant="middle"/>
                    <CardContent>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <Typography variant="body1" color="primary">
                                {t("Choose difficulty")}
                            </Typography>
                            <RadioGroup aria-label="difficultOptions" name="difficultOptions"
                                        onChange={difficultyChange}>
                                <FormControlLabel
                                    control={<Radio color="primary"/>}
                                    value="less"
                                    checked={difficultyState == "less"}
                                    label={t('Easy')}
                                />
                                <FormControlLabel
                                    control={<Radio color="primary"/>}
                                    value="more"
                                    checked={difficultyState == "more"}
                                    label={t("Middle")}
                                />
                                <FormControlLabel
                                    control={<Radio color="primary"/>}
                                    value="many"
                                    checked={difficultyState == "many"}
                                    label={t("Hard")}
                                />
                            </RadioGroup>
                            <br/>
                        </FormControl>
                        <Divider variant="middle"/>
                        <Box display="flex" alignItems="center" justifyContent="flex-start">
                            <Box p={1}>
                                <Typography variant="body1" color="primary">
                                    {t("I want to learn")}
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
                                        {items}

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
                                        onChange={loroSwitchChange}
                                        name="loroSwitch"
                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                    />
                                </Grid>
                                <Grid item xs={9}>
                                    <Grid container
                                          direction="row"
                                          justify="flex-start"
                                          alignItems="flex-start">
                                        <Grid item xs={9}>
                                            <Typography className={classes.smallTitle}>
                                                {t("Loro is")}<span>&nbsp;</span>
                                                {
                                                    loroSwitchState &&
                                                    <span color="primary" className={classes.smallTitle}>ON</span>
                                                }
                                                {
                                                    !loroSwitchState &&
                                                    <span color="primary" className={classes.smallTitle}>OFF</span>
                                                }
                                            </Typography>
                                        </Grid>

                                    </Grid>
                                    <Grid item xs={12}>
                                        {
                                            loroSwitchState &&
                                            <Typography variant="subtitle2">
                                                {t("Turn off translations")}
                                            </Typography>
                                        }
                                        {
                                            !loroSwitchState &&
                                            <Typography variant="subtitle2">
                                                {t("Turn on loro")}
                                            </Typography>
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                        <div className={classes.grid}>
                            <Grid container
                                  direction="row"
                                  justify="flex-start"
                                  alignItems="flex-start">
                                <Grid item xs={3}>
                                    <Switch
                                        color="primary"
                                        checked={runningOnWebpageSwitchState}
                                        onChange={runningOnWebpageSwitchChange}
                                        name="runningOnWebpageSwitch"
                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                    />
                                </Grid>
                                <Grid item xs={9}>
                                    <Grid container
                                          direction="row"
                                          justify="flex-start"
                                          alignItems="flex-start">
                                        <Grid item xs={12}>
                                            <Typography className={classes.smallTitle}>
                                                {t("Allow in")} <span className={classes.webpage}>{webpageState}</span>
                                            </Typography>

                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {
                                            runningOnWebpageSwitchState &&
                                            <Typography variant="subtitle2">
                                                {t("Allow translations")}
                                            </Typography>
                                        }
                                        {
                                            !runningOnWebpageSwitchState &&
                                            <Typography variant="subtitle2">
                                                {t("Disallow translations")}
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
                                    {t("Contact")}
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
