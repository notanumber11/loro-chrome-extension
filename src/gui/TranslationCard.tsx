import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import TransferendumConfig from "../TransferendumConfig";
import SettingsIcon from '@material-ui/icons/Settings';
import {CardActions} from "@material-ui/core";

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
        minHeight: 120
    },
    loroIcon: {
        position: "fixed",
        bottom: "0",
        width: "38px",
        height: "32px",
        transform: "scale(-2, 2)",
        margin: "-0% -0% -8% -15%"
    }
});


type TranslationCardProps = {
    original: string,
    translated: string,
    updateModal: (val:boolean)=>void,
    updateSettings: (val:boolean)=>void
}

const TranslationCard = ({original, translated, updateModal, updateSettings}: TranslationCardProps) => {
    const classes = myStyles();
    return (
                <Card className={classes.envelope} >
                    <img className={classes.loroIcon} src={TransferendumConfig.instance.guiProxy.getWebAccessibleResource("loro.svg")}/>
                    <CardContent className={classes.cardContent}>
                        <Typography variant="h6" component="span">
                            {original}
                        </Typography>
                        <Divider variant="fullWidth"/>
                        <Typography color="textSecondary" component="span" variant="body1"
                                    className="testCssNotAffectShadowDom">
                            {translated}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing className={classes.cardActions} >
                        <IconButton  size="small" title="Reportar error" onClick={()=>updateModal(true)}>
                            <ReportProblemIcon />
                        </IconButton>
                        <IconButton  size="small" title="Ajustes" onClick={()=>updateSettings(true)}>
                            <SettingsIcon />
                        </IconButton>
                    </CardActions>
                </Card>
    );
};

export default TranslationCard;
