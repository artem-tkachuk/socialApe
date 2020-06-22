import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Libraries
import dayjs from 'dayjs';

// Material UI imports
import { withStyles } from "@material-ui/core";
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

// Icons
import { LocationOn, CalendarToday } from '@material-ui/icons';
import LinkIcon from '@material-ui/icons/Link';

// @ts-ignore
const styles = (theme) => ({
    ...theme.styling
});

// @ts-ignore
const StaticProfile = (props) => {
    const {
        classes,
        profile: {
            handle,
            createdAt,
            imageUrl,
            bio,
            website,
            location
        }
    } = props;

    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className={"image-wrapper"}>
                    <img src={imageUrl} alt={"Profile image"} className={"profile-image"}/>
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
    );
};

StaticProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StaticProfile);