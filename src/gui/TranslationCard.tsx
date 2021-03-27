import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import DoneIcon from '@material-ui/icons/Done';
import TransferendumConfig from "../TransferendumConfig";
import SettingsIcon from '@material-ui/icons/Settings';
import {Box, CardActions, Collapse, Zoom} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import i18n from "../i18n"
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

if (i18n == null) {
    console.log("Problems with i18n, it is null");
}

const myStyles = makeStyles((theme) => ({
    cardContent: {
        paddingBottom: 0,
        "&:last-child": {
            padding: 0,
        },
        paddingTop: 8,
    },
    cardActions: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    envelope: {
        minWidth: 170,
        maxWidth: 240,
        minHeight: 80,
        display: "inline-grid",
    },
    loroIcon: {
        position: "fixed",
        bottom: "0",
        width: "38px",
        height: "32px",
        transform: "scale(-2, 2)",
        margin: "-0px -0px -15px -37px"
    },
    rewardContent: {
        paddingBottom: 0,
        "&:last-child": {
            paddingBottom: 0,
        },
        padding: "16px", // For some reason the padding gets reset when the card is under the Zoom element
    },
    rewardTypography: {
        color: "green"
    },
    rewardIcon: {
        fontSize: "3rem"
    },
    button: {
        color: theme.palette.secondary.light,
    }
}));


type TranslationCardProps = {
    original: string,
    translated: string,
    openModalCallback: () => void,
    openSettingsCallback: () => void,
    removeWordCallback: () => void,
    openIknowWordCallback: () => void,
}

const TranslationCard = ({original, translated, openModalCallback, openSettingsCallback, removeWordCallback, openIknowWordCallback}: TranslationCardProps) => {
    const {t, i18n} = useTranslation();
    const classes = myStyles();
    const [showKnownWordsCounter, setShowKnownWordsCounter] = React.useState(false);
    const [showCardContent, setShowCardContent] = React.useState(true);
    const [showCollapsed, setShowCollapsed] = React.useState(true);

    const showReward = async () => {
        // Show to the user the reward card
        setShowKnownWordsCounter(true);
        setShowCardContent(false);

        let conf = TransferendumConfig.instance.guiProxy;
        let alreadyKnownWords = await conf.getFromLocalStore(TransferendumConfig.WORDS_MARKED_AS_KNOWN, -1);
        if (alreadyKnownWords != -1) {
            // @ts-ignore
            alreadyKnownWords.push(original);
            conf.setOnLocalStore(TransferendumConfig.WORDS_MARKED_AS_KNOWN, alreadyKnownWords);
        }

        // if it the first time that the user marks a word as learn we show the explanation modal
        let firstTime = await conf.getFromLocalStore(TransferendumConfig.FIRST_TIME_MARKED_AS_KNOWN, false);
        removeWordCallback();
        if (firstTime == true) {
            openIknowWordCallback();
            conf.setOnLocalStore(TransferendumConfig.FIRST_TIME_MARKED_AS_KNOWN, false);
        }
    };

    return (
        <div>
            <Collapse in={showCollapsed}>
                <Card className={classes.envelope}>
                    {
                        showKnownWordsCounter &&
                        <Zoom in={showKnownWordsCounter}
                              style={{transitionDelay: showKnownWordsCounter ? '400ms' : '0ms'}}>
                            <CardContent className={classes.rewardContent}>
                                <Typography variant="h6" color="primary" component="span">
                                    Nice!
                                </Typography>
                                <Divider variant="fullWidth"/>
                                <Typography className={classes.rewardTypography} variant="h3">
                                    <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
                                        <ThumbUpIcon className={classes.rewardIcon} fontSize="large"/>
                                    </Box>
                                </Typography>
                            </CardContent>
                        </Zoom>
                    }
                    {
                        showCardContent &&
                        <div>
                            <CardContent className={classes.cardContent}>
                                <img className={classes.loroIcon}
                                     src={TransferendumConfig.instance.guiProxy.getWebAccessibleResource("loro.svg")}/>
                                <Typography variant="h6" component="span" align="center">
                                    {original}
                                </Typography>
                                <Divider variant="fullWidth"/>

                                {/*                                 <Box display="flex">
                                     <Box flexGrow={1}>
                                         <Typography variant="h6" component="span" align="center">
                                             {original}
                                         </Typography>
                                     </Box>
                                     <Box>

                                     </Box>
                                 </Box>

                                <Typography color="textSecondary" component="span" variant="body1">
                                    {translated}
                                </Typography>*/}
                            </CardContent>
                            <CardActions disableSpacing className={classes.cardActions}>
                                <IconButton size="small" title={t("Report error")} onClick={() => openModalCallback()}>
                                    <ReportProblemIcon/>
                                </IconButton>
                                <IconButton size="small" title={t("I know this word")} onClick={showReward}>
                                    <DoneIcon></DoneIcon>
                                </IconButton>
                                <IconButton size="small" title={t("Settings")} onClick={() => openSettingsCallback()}>
                                    <SettingsIcon/>
                                </IconButton>
                                <IconButton size="small" title={t("Report error")} className={classes.button}
                                            onClick={() => openModalCallback()}>
                                    <VolumeUpIcon/>
                                </IconButton>
                            </CardActions>
                        </div>
                    }
                </Card>
            </Collapse>
        </div>

    );
};

export default TranslationCard;
