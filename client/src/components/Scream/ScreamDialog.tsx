import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from "react-redux";
import { getScream, clearErrors } from "../../redux/actions/dataActions";

// Components
import MyButton from '../util/myButton';
import { Link } from 'react-router-dom';
import Comments from "./Comments";
import CommentForm from "./CommentForm";

// Material UI
import {withStyles} from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from "@material-ui/core/CircularProgress";

// Icons
import CloseIcon from '@material-ui/icons/Close'
import UnfoldMore from '@material-ui/icons/UnfoldMore';

// Time
import dayjs from "dayjs";
import LikeButton from "./LikeButton";
import ChatIcon from "@material-ui/icons/Chat";
import user from "../../pages/user";

// Styles
// @ts-ignore
const styles = theme => ({
    ...theme.styling,
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
});


class ScreamDialog extends Component {
    state = {
        open: false,
        oldPath: '',
        newPath: ''
    };

    componentDidMount() {
        // @ts-ignore
        if (this.props.openDialog) {
            this.handleOpen();
        }
    }

    handleOpen = () => {
        let oldPath = window.location.pathname;
        // @ts-ignore
        const { userHandle, screamId } = this.props;

        const newPath = `/users/${userHandle}/screams/${screamId}`;

        if (oldPath === newPath) {  //edge case
            oldPath = `/users/${userHandle}`;
        }

        // @ts-ignore
        window.history.pushState(null, null, newPath);

        this.setState({
            open: true,
            oldPath,
            newPath
        });

        // @ts-ignore
        this.props.getScream(this.props.screamId);
    };

    handleClose = () => {
        // @ts-ignore
        window.history.pushState(null, null, this.state.oldPath);

        this.setState({
            open: false
        });

        // @ts-ignore
        this.props.clearErrors();
    };

    render() {
        const {
            // @ts-ignore
            classes,
            // @ts-ignore
            scream: {
                screamId,
                body,
                createdAt,
                likeCount,
                commentCount,
                userImage,
                userHandle,
                comments
            },
            // @ts-ignore
            UI: {
                loading
            }
        } = this.props;

        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2} />
            </div>
        ) : (
            <Grid container spacing={2}>
                <Grid item sm={5}>
                    <img src={userImage} alt={"Profile image"} className={classes.profileImage} />
                </Grid>

                <Grid item sm={6}>
                    <Typography
                        component={Link}
                        color={"primary"}
                        variant={"h5"}
                        to={`/users/${userHandle}`}
                    >
                        @{userHandle}
                    </Typography>

                    <hr className={classes.invisibleSeparator} />

                    <Typography variant={"body2"} color={"textSecondary"}>
                        {
                            dayjs(createdAt).format(`h:mm a, MMMM DD YYYY`)
                        }
                    </Typography>

                    <hr className={classes.invisibleSeparator} />

                    <Typography variant={"body1"}>
                        {body}
                    </Typography>

                    <LikeButton
                        // @ts-ignore
                        screamId={screamId}
                    />
                    <span> {likeCount} likes </span>

                    <MyButton tip={"comments"} onClick={""}>
                        <ChatIcon color={"primary"}/>
                    </MyButton>
                    <span>{commentCount} comment(s) </span>
                </Grid>

                <hr className={classes.visibleSeparator} />
                <CommentForm
                    // @ts-ignore
                    screamId={screamId}
                />
                <Comments
                    // @ts-ignore
                    comments={comments}
                />
            </Grid>
        );

        return (
            <Fragment>
                <MyButton
                    onClick={this.handleOpen}
                    tip={"Expand scream"}
                    tipClassName={classes.expandButton}
                >
                    <UnfoldMore color={"primary"} />
                </MyButton>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth={"sm"}
                >
                    <MyButton
                        tip={"Close"}
                        onClick={this.handleClose}
                        tipClassName={classes.closeButton}
                    >
                        <CloseIcon />
                    </MyButton>

                    <DialogContent className={classes.dialogContent}>
                        {
                            dialogMarkup
                        }
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}

// @ts-ignore
ScreamDialog.propTypes = {
    clearErrors: PropTypes.func.isRequired,
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

// @ts-ignore
const mapStateToProps = state => ({
    scream: state.data.scream,
    UI: state.UI
});

const mapActionsToProps = ({
    getScream,
    clearErrors
});

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog));