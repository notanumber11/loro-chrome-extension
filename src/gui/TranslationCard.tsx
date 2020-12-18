import React from 'react';
import {makeStyles, styled} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import { spacing } from "@material-ui/system";
import CheckIcon from '@material-ui/icons/Check';
import {CardActions} from "@material-ui/core";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const myStyles = makeStyles({
    root: {
        minWidth: 120,
        minHeight: 120,
        paddingBottom: 0
    },
    cardContent: {
        "&:last-child": {
            paddingTop: 0,
            paddingBottom: 0
        }
    },
    title: {
        fontSize: 8,
    },
    pos: {
        marginBottom: 0,
        paddingBottom: 0,
    },
    envelope: {
        width: "100px",
        zIndex: 1,
        backgroundColor: "white",
        position: "absolute",
        bottom: "105%"
    }

});

const StyledIconButton = styled(IconButton)(spacing);


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
                        <Typography variant="h5" component="h2">
                            {original}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            {translated}
                        </Typography>
                        <CardActions disableSpacing>
                            <StyledIconButton m={0} aria-label="I know that word">
                                <CheckIcon />
                            </StyledIconButton>
                            <StyledIconButton  m={0} aria-label="Report error">
                                <ErrorOutlineIcon />
                            </StyledIconButton>
                        </CardActions>
                    </CardContent>
                </Card>
            </Box>
        </div>
    );
}

export default TranslationCard;
