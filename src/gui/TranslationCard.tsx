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

console.log(i18n);

const myStyles = makeStyles({
    cardContent: {
        paddingBottom: 0,
        "&:last-child": {
            padding: 0,
        }
    },
    cardActions: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    envelope: {
        minWidth: 120,
        maxWidth: 240,
        minHeight: 120,
        display: "inline-grid",
    },
    loroIcon: {
        position: "fixed",
        bottom: "0",
        width: "38px",
        height: "32px",
        transform: "scale(-2, 2)",
        margin: "-0px -0px -15px -30px"
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
    }
});


type TranslationCardProps = {
    original: string,
    translated: string,
    updateModal: (val: boolean) => void,
    updateSettings: (val: boolean) => void,
    removeWord: () => void
}

const TranslationCard = ({original, translated, updateModal, updateSettings, removeWord}: TranslationCardProps) => {
    const {t, i18n} = useTranslation();
    const classes = myStyles();
    const [showKnownWordsCounter, setShowKnownWordsCounter] = React.useState(false);
    const [showCardContent, setShowCardContent] = React.useState(true);
    const [showCollapsed, setShowCollapsed] = React.useState(true);

    const showReward = async () => {
        // Retrieve and update learned words
        let wordsAlreadyLearn: number = Number((await TransferendumConfig.instance.guiProxy.getFromLocalStore(TransferendumConfig.WORKS_MARKED_AS_KNOWN_KEY, 0))) + 1;
        TransferendumConfig.instance.guiProxy.setOnLocalStore(TransferendumConfig.WORKS_MARKED_AS_KNOWN_KEY, wordsAlreadyLearn);
        // Show to the user the reward card
        setShowKnownWordsCounter(true);
        setShowCardContent(false);
        // Create a counter that updates the value
        removeWord();
    };

    return (
        <Collapse in={showCollapsed} timeout={10000}>
            <Card className={classes.envelope}>
                {
                    showKnownWordsCounter &&
                    <Zoom in={showKnownWordsCounter} style={{transitionDelay: showKnownWordsCounter ? '400ms' : '0ms'}}>
                        <CardContent className={classes.rewardContent}>
                            <Typography variant="h6" color="primary" component="span">
                                Nice!
                            </Typography>
                            <Divider variant="fullWidth"/>
                            <Typography className={classes.rewardTypography} variant="h3">
                                {/*+{counterState}*/}
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
                            <Typography variant="h6" component="span">
                                {original}
                            </Typography>
                            <Divider variant="fullWidth"/>
                            <Typography color="textSecondary" component="span" variant="body1">
                                {translated}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing className={classes.cardActions}>
                            <IconButton size="small" title={t("Report error")} onClick={() => updateModal(true)}>
                                <ReportProblemIcon/>
                            </IconButton>
                            <IconButton size="small" title={t("I know this word")} onClick={showReward}>
                                <DoneIcon></DoneIcon>
                            </IconButton>
                            <IconButton size="small" title={t("Settings")} onClick={() => updateSettings(true)}>
                                <SettingsIcon/>
                            </IconButton>
                        </CardActions>
                    </div>
                }
            </Card>
        </Collapse>
    );
};

export default TranslationCard;
