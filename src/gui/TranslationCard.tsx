import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import ReportErrorModal from "./ReportErrorModal";

const myStyles = makeStyles({
    cardContent: {
        paddingBottom: 0,
        "&:last-child": {
            padding: 0,
        }
    },
    envelope: {
        width: 140,
        minWidth: 140,
        maxWidth: 140,
    }
});


type TranslationCardProps = {
    original: string,
    translated: string
}

const TranslationCard = ({original, translated}: TranslationCardProps) => {
    const classes = myStyles();
    return (
                <Card className={classes.envelope}>
                    <CardContent className={classes.cardContent}>
                        <Typography variant="h5" component="span">
                            {original}
                        </Typography>
                        <Divider variant="fullWidth"/>
                        <Typography color="textSecondary" component="span" variant="h6"
                                    className="testCssNotAffectShadowDom">
                            {translated}
                        </Typography>
                    </CardContent>
                    <Box display="flex" flexDirection="row-reverse">
                        <Box p={1}>
                            <ReportErrorModal original={original} translated={translated}/>
                        </Box>
                    </Box>
                </Card>
    );
};

export default TranslationCard;
