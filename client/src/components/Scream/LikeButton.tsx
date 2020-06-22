import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

import { connect } from "react-redux";

import MyButton from "../util/myButton";

import { likeScream, unlikeScream } from "../../redux/actions/dataActions";

// Icons
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

class LikeButton extends Component {
    likedScream = () => {
        // @ts-ignore
        return !!(this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.screamId));
    };

    likeScream = () => {
        // @ts-ignore
        this.props.likeScream(this.props.screamId);
    };

    unlikeScream = () => {
        // @ts-ignore
        this.props.unlikeScream(this.props.screamId);
    };

    render() {

        // @ts-ignore
        const { authenticated } = this.props.user;

        const likeButton = !authenticated ? (
            <Link to={'/login'}>
                {
                    // @ts-ignore}
                    <MyButton tip={"Like"}>
                        <FavoriteBorder color={"primary"} />
                    </MyButton>
                }
            </Link>
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

        return likeButton;
    }
}

// @ts-ignore
LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired
};

// @ts-ignore
const mapStateToProps = state => ({
    user: state.user
});

const mapActionsToProps = {
    likeScream,
    unlikeScream
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);