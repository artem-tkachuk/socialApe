import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import dayjs from "dayjs";

import { Link } from 'react-router-dom';

// Redux
import { uploadImage, logOutUser } from "../redux/actions/userActions";

// Material UI imports
import {Button, Paper, Theme, Typography, withStyles} from "@material-ui/core";
import MuiLink from "@material-ui/core/Link";
import Tooltip from "@material-ui/core/Tooltip";

// Icons
import { LocationOn, CalendarToday } from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";
import LinkIcon from '@material-ui/icons/Link';

const styles = (theme: Theme) => ({
    // @ts-ignore
    ...theme.styling
});

class Profile extends Component {
    // @ts-ignore
    handleImageChange = (event) => {
        const image = event.target.files[0];

        //send the file to the server
        const formData = new FormData();

        formData.append('image', image, image.name);

        // @ts-ignore
        this.props.uploadImage(formData);
    };

    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput!.click();
    };


    render() {

        const {
            // @ts-ignore
            classes,
            // @ts-ignore
            user : {
                // @ts-ignore
                credentials: {
                    handle, createdAt, imageUrl, bio, website, location
                },
                loading,
                authenticated
            },
        } = this.props;

        let profileMarkup = !loading ?  //if we are not loading the details right now
            (authenticated ? (
                <Paper className={classes.paper}>
                    <div className={classes.profile}>
                        <div className={"image-wrapper"}>
                            <img src={imageUrl} alt={"Profile image"} className={"profile-image"}/>

                            <input type={"file"} hidden={true} id={"imageInput"} onChange={this.handleImageChange} />

                            <Tooltip title={"Edit profile picture"} placement={"top"}>
                                <IconButton onClick={this.handleEditPicture} className={"button"}>
                                    <EditIcon color={"primary"} />
                                </IconButton>
                            </Tooltip>
                        </div>

                        <hr/>

                        <div className={"profile-details"}>
                            <MuiLink
                                component={Link}
                                to={`/users/${handle}`}
                                color={"primary"}
                                variant={"h5"}
                            >
                                @{handle}
                            </MuiLink>

                            <hr/>
                            {
                                bio && <Typography variant={"body2"}>{bio}</Typography>
                            }

                            <hr/>
                            {
                                location && (
                                    <Fragment>
                                        <LocationOn color={"primary"} /> <span>{location}</span>
                                        <hr/>
                                    </Fragment>
                                )
                            }

                            {
                                website && (
                                    <Fragment>
                                        <LinkIcon color={"primary"}/>
                                        <a href={website} target={"_blank"} rel={"noopener noreferrer"}>
                                            {' '}{website}
                                        </a>
                                        <hr/>
                                    </Fragment>
                                )
                            }

                            <CalendarToday color={"primary"}/>{' '}
                            <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                        </div>
                    </div>
                </Paper>
            ) : (
                <Paper className={classes.paper}>
                    <Typography variant={"body2"} align={"center"}>
                        No profile found, please login again!
                    </Typography>

                    <div className={classes.buttons}>
                        <Button variant={"contained"} color={"primary"} component={Link} to={'/login'}>
                            Login
                        </Button>
                        <Button variant={"contained"} color={"secondary"} component={Link} to={'/sign-up'}>
                            Sign Up
                        </Button>
                    </div>
                </Paper>
            )) : (<p>Loading...</p>);

        return profileMarkup;
    }
}

// @ts-ignore
const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    logOutUser,
    uploadImage
};

// @ts-ignore
Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logOutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));