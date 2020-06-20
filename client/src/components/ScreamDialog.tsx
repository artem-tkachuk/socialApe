import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from "react-redux";
import { getScream } from "../redux/actions/dataActions";

// Components
import MyButton from './util/myButton';
import { Link } from 'react-router-dom';

// Material UI
import {withStyles} from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from "@material-ui/core/CircularProgress";

// Icons
import CloseIcon from '@material-ui/icons/Close'
import UnfoldMore from '@material-ui/icons/UnfoldMore';

// Time
import dayjs from "dayjs";


// Styles
import {theme} from "../styles/theme";

// @ts-ignore
const styles = theme => ({
    ...theme.styling,
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
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
    }
});


class ScreamDialog extends Component {
    state = {
        open: false
    };

    handleOpen = () => {
        this.setState({
            open: true
        });

        // @ts-ignore
        this.props.getScream(this.props.screamId);
    };

    handleClose = () => {
        this.setState({
            open: false
        });
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
                userHandle
            },
            // @ts-ignore
            UI: {
                loading
            }
        } = this.props;

        const dialogMarkup = loading ? (
            <CircularProgress size={200} />
        ) : (
            <Grid container spacing={2}>
                <Grid item sm={5}>
                    <img src={userImage} alt={"Profile image"} className={classes.profileImage} />
                </Grid>

                <Grid item sm={5}>
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
                </Grid>
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
    getScream
});

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog));