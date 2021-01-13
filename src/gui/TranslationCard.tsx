import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import shadows from "@material-ui/core/styles/shadows";
import TransferendumConfig from "../TransferendumConfig";


const myStyles = makeStyles({
    cardContent: {
        paddingBottom: 0,
        "&:last-child": {
            padding: 0,
        }
    },
    envelope: {
        minWidth: 120,
        minHeight: 120
    },
    loroIcon: {
        position: "fixed",
        bottom: "0",
        width: "38px",
        height: "32px"
    }
});


type TranslationCardProps = {
    original: string,
    translated: string,
    updateModal: (val:boolean)=>void
}

const TranslationCard = ({original, translated, updateModal}: TranslationCardProps) => {
    const classes = myStyles();
    return (
                <Card className={classes.envelope}>
                    <img className={classes.loroIcon} src={TransferendumConfig.instance.guiProxy.getWebAccessibleResource("icon-card.png")}/>
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
                    <Box display="flex" flexDirection="row-reverse" align-items="flex-end">
                        <Box p={1}>
                            <IconButton  size="small" title="Report error" onClick={()=>updateModal(true)}>
                                <ReportProblemIcon color="primary" />
                            </IconButton>
                        </Box>
                    </Box>
                </Card>
    );
};

export default TranslationCard;
