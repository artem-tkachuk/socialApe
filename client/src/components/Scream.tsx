import * as React from 'react';

// Component
import PropTypes from 'prop-types';
import {Component} from 'react';
import { Link } from "react-router-dom";
import MyButton from '../util/myButton';

// Redux
import { connect } from "react-redux";
import { likeScream, unlikeScream} from "../redux/actions/dataActions";

// Time
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

// Material UI imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core";

// Icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

// Styles
import { styles } from "../styles/scream";

class Scream extends Component {
    likedScream = () => {
        // @ts-ignore
        return !!(this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.scream.screamId));
    };

    likeScream = () => {
        // @ts-ignore
        this.props.likeScream(this.props.scream.screamId);
    };

    unlikeScream = () => {
        // @ts-ignore
        this.props.unlikeScream(this.props.scream.screamId);
    };

    render() {
        dayjs.extend(relativeTime);

        // @ts-ignore
        const classes = this.props.classes;
        // @ts-ignore
        const { body, userImage, createdAt, userHandle, screamId, likeCount, commentCount } = this.props.scream;
        // @ts-ignore
        const { authenticated } = this.props.user;

        const likeButton = !authenticated ? (
            // @ts-ignore
            <MyButton tip={"Like"}>
                <Link to={'/login'}>
                    <FavoriteBorder color={"primary"} />
                </Link>
            </MyButton>
        ) : (
            this.likedScream() ? (
                <MyButton tip={"Undo like"} onClick={this.unlikeScream}>
                    <FavoriteIcon color={"primary"} />
                </MyButton>
            ) : (
                <MyButton tip={"Like scream"} onClick={this.likeScream}>
                    <FavoriteBorder color={"primary"} />
                </MyButton>
            )
        );

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

                    {likeButton}
                    <span> {likeCount} likes </span>

                    <MyButton tip={"comments"} onClick={""}>
                        <ChatIcon color={"primary"}/>
                    </MyButton>

                    <span> {commentCount} comment(s) </span>
                </CardContent>
            </Card>
        );
    }
}

// @ts-ignore
Scream.propTypes = {
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

// @ts-ignore
const mapStateToPros = (state) => ({
    user: state.user,
});

const mapActionsToProps = {
    likeScream,
    unlikeScream
};


// @ts-ignore
export default connect(mapStateToPros, mapActionsToProps)(withStyles(styles)(Scream));