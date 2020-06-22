import * as React from 'react';

// Components
import PropTypes from 'prop-types';
import {Component} from 'react';
import { Link } from "react-router-dom";

// Components
import MyButton from '../util/myButton';
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";
import LikeButton from "./LikeButton";

// Redux
import { connect } from "react-redux";
import { likeScream, unlikeScream} from "../../redux/actions/dataActions";

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
import { styles } from "../../styles/scream";


class Scream extends Component {


    render() {
        dayjs.extend(relativeTime);

        // @ts-ignore
        const classes = this.props.classes;
        // @ts-ignore
        const { body, userImage, createdAt, userHandle, screamId, likeCount, commentCount } = this.props.scream;
        // @ts-ignore
        const { authenticated, credentials: { handle } } = this.props.user;

        const deleteButton = authenticated && userHandle == handle ? (
            // @ts-ignore
            <DeleteScream screamId={screamId} />
        ) : (
            ''
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

                    {deleteButton}

                    <Typography variant={"body2"}>
                        {dayjs(createdAt).fromNow()}
                    </Typography>

                    <Typography variant={"body1"}>{body}</Typography>

                    <LikeButton
                        // @ts-ignore
                        screamId={screamId}
                    />
                    <span> {likeCount} likes </span>

                    <MyButton tip={"comments"} onClick={""}>
                        <ChatIcon color={"primary"}/>
                    </MyButton>

                    <span> {commentCount} comment(s) </span>


                    <ScreamDialog
                        // @ts-ignore
                        screamId={screamId}
                        userHandle={userHandle}
                    />
                </CardContent>
            </Card>
        );
    }
}

// @ts-ignore
Scream.propTypes = {
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

// @ts-ignore
const mapStateToPros = (state) => ({
    user: state.user,
});


// @ts-ignore
export default connect(mapStateToPros, null)(withStyles(styles)(Scream));