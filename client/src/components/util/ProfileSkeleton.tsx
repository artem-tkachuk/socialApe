import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import NoImg from '../../images/no-img.png';

//Material UI imports
import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

// Icons
import { LocationOn, CalendarToday } from '@material-ui/icons';
import LinkIcon from '@material-ui/icons/Link';

// @ts-ignore
const styles = theme => ({
    ...theme.styling,
    handle: {
        height: 20,
        backgroundColor: theme.palette.primary.main,
        width: 60,
        margin: '0px auto 7px auto'
    },
    fullLine: {
        height: 15,
        backgroundColor: 'rgba(0,0,0, 0.6)',
        width: '100%',
        marginBottom: 10
    },
    halfLine: {
        height: 15,
        backgroundColor: 'rgba(0,0,0, 0.6)',
        width: '50%',
        marginBottom: 10
    }
});

// @ts-ignore
const ProfileSkeleton = (props) => {
    const { classes } = props;

    return (
        <Paper className={classes.paper}>
           <div className={classes.profile}>
                <div className={"image-wrapper"}>
                    <img
                        src={NoImg}
                        alt={"profile"}
                        className={"profile-image"}
                    />

                    <hr />

                    <div className={"profile-details"}>
                        <div className={classes.handle} />

                        <hr />

                        <div className={classes.fullLine} />
                        <div className={classes.fullLine} />

                        <hr />

                        <LocationOn color={"primary"} /> <span>Location</span>

                        <hr />

                        <LinkIcon color={"primary"}/> https://website.com/

                        <hr />

                        <CalendarToday color={"primary"} /> Joined date
                    </div>
                </div>
           </div>
        </Paper>
    );
};

ProfileSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSkeleton);