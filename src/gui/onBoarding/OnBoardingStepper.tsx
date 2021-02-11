import React, {useEffect} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TransferendumConfig from "../../TransferendumConfig";
import replaceJSX from "react-string-replace"

import {
    Box,
    FormControl,
    FormControlLabel,
    IconButton,
    MenuItem,
    Paper,
    Radio,
    RadioGroup,
    Select,
    useMediaQuery,
} from "@material-ui/core";
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CloseIcon from "@material-ui/icons/Close";
import WordHovering from "../WordHovering";
import Translator from "../../nlp/Translator";
import { useTranslation } from 'react-i18next';
import i18n from "../../i18n"
import i18next from "i18next";
console.log(i18n);

const useStyles = makeStyles((theme: Theme) => {
        return createStyles({
            laptop: {
                padding: "25px",
                width: "450px",
            },
            paper: {
                backgroundColor: theme.palette.background.paper,
                padding: "20px",
                border: "none",
                outline: 'none'
            },
            phone: {},
            backButton: {
                marginRight: theme.spacing(1),
            },
            forwardButton: {
                backgroundColor: theme.palette.primary.main,
            },
            instructions: {
                marginTop: theme.spacing(1),
                marginBottom: theme.spacing(1),
            },
            formChooseLanguage: {
                margin: theme.spacing(1),
                minWidth: 120,
            },
            loroIcon: {
                width: "100px",
                height: "100px"
            },
            loroIconMini: {
                width: "25px",
                height: "25px"
            },
        })
    }
);

function getSteps() {
    return [0, 1, 2, 4];
}

type OnBoardingStepperProps = {
    callbackCloseModal: () => void
}

export default function OnBoardingStepper(props: OnBoardingStepperProps) {
    const { t, i18n } = useTranslation();
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const iconSrc = TransferendumConfig.instance.guiProxy.getWebAccessibleResource("loro.svg");
    const guiProxy = TransferendumConfig.instance.guiProxy;
    const [motherTongueState, setMotherTongue] = React.useState("es");
    const [languageState, setLanguageState] = React.useState("en");
    const translator = new Translator();
    const  learnWhileYouBrowseMap:Map<string, Array<string>> = new Map([
        ["es", ["nuevo", "traducción"]],
        ["en", ["new", "translation"]],
        ["pl", ["nowego", "tłumaczenie"]]
    ]);

    const settingsStep1Map:Map<string, Array<string>> = new Map([
        ["es", ["icono"]],
        ["en", ["icon"]],
        ["pl", ["ikonę"]]
    ]);

    const settingsStep2Map:Map<string, Array<string>> = new Map([
        ["es", ["palabra"]],
        ["en", ["word"]],
        ["pl", ["słowo"]]
    ]);

    useEffect(() => {
        guiProxy.getFromLocalStore(TransferendumConfig.LANGUAGE_KEY, "en").then(
            val => setLanguageState(val.toString())
        );
        dispatchLoroEvent();
    }, []);

    const event = new Event('loro', {bubbles: true});

    const dispatchLoroEvent = () => {
        window.dispatchEvent(event);
    };

    const getStepContent = (stepIndex: number) => {
        switch (stepIndex) {
            case 0:
                return mainLanguage;
            case 1:
                return chooseLanguage;
            case 2:
                return learnWhileYourBrowse;
            case 3:
                return settings;
            case 4:
                return everythingReady;
            default:
                return 'Unknown stepIndex';
        }
    };

    const handleMotherTongueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value as string;
        setMotherTongue(value);
    };

    const onLanguageChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        let value = event.target.value as string;
        setLanguageState(value);
    };

    const mainLanguage =
        <div>
            <Typography variant="h4" color="primary">
                Loro
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center" m={1} p={1}>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="mainLanguage" name="mainLanguage" value={motherTongueState}
                                onChange={handleMotherTongueChange}>
                        <FormControlLabel value="es" control={<Radio color="primary"/>}
                                          color="primary"
                                          label={<Typography variant="body1">Mi lengua materna es el
                                              castellano</Typography>}/>
                        <FormControlLabel value="en" control={<Radio color="primary"/>}
                                          color="primary"
                                          label={<Typography variant="body1">My mother tongue is
                                              English</Typography>}/>
                        <FormControlLabel value="pl" control={<Radio color="primary"/>}
                                          color="primary"
                                          label={<Typography variant="body1">Mój język ojczysty to
                                              polski</Typography>}/>
                    </RadioGroup>
                </FormControl>
            </Box>
        </div>;

    function getAvailableLanguages() {
        const items = [];
        for(let el of TransferendumConfig.AVAILABLE_LANGUAGES.get(motherTongueState)!) {
            let languageLong = TransferendumConfig.LANGUAGE_CODE_TO_LANGUAGE.get(el);
            items.push(<MenuItem key={el} value={el}>{languageLong}</MenuItem>)
        }
        return items;
    }

    const chooseLanguage =
        <div>
            <Box p={1}>
                <Typography variant="h4" color="primary">
                    {t("Wellcome to Loro")}
                </Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center">
                <Box p={1}>
                    <Typography variant="h6">
                        {t("I want to learn")}
                    </Typography>
                </Box>
                <Box p={1}>
                    <FormControl className={classes.formChooseLanguage}>
                        <Select
                            onChange={onLanguageChange}
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={languageState}
                        >
                            {getAvailableLanguages()}
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        </div>;

    const learnWhileYourBrowse =
        <div>
            <Typography variant="h4" color="primary">
                {t("How it works")}
            </Typography>
            <Typography variant="h6">
                <p className="loro">
                    {
                        adaptContentToLanguage(learnWhileYouBrowseMap.get(motherTongueState)!, t("How it works step"))
                    }
                </p>
                <br/>
            </Typography>
        </div>;

    const settings =
        <div>
            <Typography variant="h4" color="primary">
                {t("Settings")}
            </Typography>
            <Typography variant="h6">
                <p>
                    <span className="loro">
                        {
                            adaptContentToLanguage(settingsStep1Map.get(motherTongueState)!, t("Settings step 1"))
                        }
                    </span>
                    <IconButton size="small" title="Ajustes">
                        <SettingsIcon/>
                    </IconButton>
                    <span className="loro">
                        {
                            adaptContentToLanguage(settingsStep2Map.get(motherTongueState)!, t("Settings step 2"))
                        }
                    </span>
                </p>
            </Typography>
        </div>;

    const everythingReady = <div>
        <Typography variant="h4" color="primary">
            {t("Loro is ready")}
        </Typography>
        <Typography variant="h6" className={classes.instructions}>{t("Loro is ready step")}</Typography>
    </div>;

    function adaptContentToLanguage(arrayOfWords: Array<string>, content: string) {
        // In order to translate we need to know first the mother tongue and the language that the
        // user wants to learn
        if (activeStep > 1) {
            console.log(`From lang=${motherTongueState} to lang=${languageState}`);
            let r = content;
            let count = 1; // Without this react warned me about using same key in components.
            for (let i=0; i<arrayOfWords.length; i++)
            {
                let word = arrayOfWords[i];
                let translated = translator.translateSingleWord(motherTongueState, languageState, word);
                let regEx = new RegExp('('+ word +')','gi');
                // @ts-ignore
                r = replaceJSX(r, regEx, (match, i) => {
                    count += 1;
                    return <WordHovering key={count + i} original={match} translated={translated}/>
                });
            }
            return r;
        }
    }

    const handleNext = () => {
        i18next.changeLanguage(motherTongueState);
        guiProxy.setOnLocalStore(TransferendumConfig.LANGUAGE_KEY, languageState);
        guiProxy.setOnLocalStore(TransferendumConfig.MOTHER_TONGUE_KEY, motherTongueState);
        // Never show as option to learn one that is not available
        let availableLanguages = TransferendumConfig.AVAILABLE_LANGUAGES.get(motherTongueState)!;
        if (!availableLanguages.includes(languageState)) {
            // We put the first language available as default
            setLanguageState(availableLanguages[0]);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const matches = useMediaQuery('(min-width:600px)');

    return (
        <Paper className={classes.paper} elevation={3}>
            <Box display="flex" flexDirection="row-reverse">
                <IconButton aria-label="close" onClick={() => props.callbackCloseModal()}>
                    <CloseIcon color="primary"/>
                </IconButton>
            </Box>
            <div className={matches ? classes.laptop : classes.phone}>
                <Box display="flex" justifyContent="center" m={1} p={1}>
                    <img className={classes.loroIcon} src={iconSrc} alt="loro icon"/>
                </Box>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel></StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {getStepContent(activeStep)}
                    <div>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            className={classes.backButton}
                    >
                            <ArrowBackIcon style={{color: 'black'}}/>
                        </Button>
                        {activeStep === steps.length ? (
                            <div>
                            </div>
                        ) : (
                            <Button style={{backgroundColor: "#3f51b5"}} onClick={handleNext}>
                                <ArrowForwardIcon style={{color: 'white'}}/>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </Paper>
    );
}
