import * as React from 'react';
import {Component} from 'react';

import { Link } from "react-router-dom";

// Time difference
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

// Material UI imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core";

import { styles } from "../styles/scream";

class Scream extends Component {
    render() {
        dayjs.extend(relativeTime);

        // @ts-ignore
        const classes = this.props.classes;
        // @ts-ignore
        const { body, userImage, createdAt, userHandle, screamId, likeCount, commentCount } = this.props.scream;

        return (
            <Card className={classes.card}>
                <CardMedia
                    image={userImage}
                    title="Profile image"
                    className={classes.image}
                />

                <CardContent className={classes.content}>
                    <Typography
                        variant={"h5"}
                        component={Link}
                        to={`/users/${userHandle}`}
                        color={"primary"}
                    >{userHandle}</Typography>

                    <Typography variant={"body2"}>
                        {dayjs(createdAt).fromNow()}
                    </Typography>

                    <Typography variant={"body1"}>{body}</Typography>
                </CardContent>
            </Card>
        );
    }
}

// @ts-ignore
export default withStyles(styles)(Scream);