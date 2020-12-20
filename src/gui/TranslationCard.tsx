import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import ReportErrorModal from "./ReportErrorModal";

const myStyles = makeStyles({
    root: {
        minWidth: 120,
        paddingBottom: 0
    },
    cardContent: {
        paddingBottom: 0,
        "&:last-child": {
            padding: 0,
        }
    },
    envelope: {
        width: "100px",
        zIndex: 1,
        backgroundColor: "white",
        position: "absolute",
        bottom: "105%"
    },
    t1: {
      fontSize: 20
    },
    t2: {
        fontSize: 16
    }

});


type TranslationCardProps = {
    original: string,
    translated: string
}

const TranslationCard = ({original, translated}: TranslationCardProps) => {
    const classes = myStyles();
    return (
        <div className={classes.envelope}>
            <Box>
                <Card className={classes.root}>
                    <CardContent className={classes.cardContent}>
                        <Typography variant="h5" component="span" className={classes.t1}>
                            {original}
                        </Typography>
                        <Divider variant="fullWidth" />
                        <Typography color="textSecondary" component="span" variant="h6" className={classes.t2}>
                            {translated}
                        </Typography>
                    </CardContent>
                        <Box display="flex" flexDirection="row-reverse">
                            <Box p={1}>
                                <ReportErrorModal original={original} translated={translated} reportError={true} />
                            </Box>
                        </Box>
                </Card>
            </Box>
        </div>
    );
};

export default TranslationCard;
