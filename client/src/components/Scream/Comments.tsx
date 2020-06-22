import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from "react-redux";

// Components
import MyButton from '../util/myButton';
import { Link } from 'react-router-dom';

// Material UI
import {withStyles} from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

// Time
import dayjs from "dayjs";

// @ts-ignore
const styles = theme => ({
    ...theme.styling,
    commentImage: {
        maxWidth: '100%',
        height: 100,
        objectFit: 'cover',
        borderRadius: '50%'
    },
    commentData: {
        marginLeft: 20
    }
});

class Comments extends Component {
    render() {
        // @ts-ignore
        const { comments, classes } = this.props;

        return (
            <Grid container>
                {
                    // @ts-ignore
                    comments.map((comment, index) => {
                        const { body, createdAt, userImage, userHandle } = comment;
                        return (
                            <Fragment key={createdAt}>
                                <Grid item sm={12}>
                                    <Grid container>
                                        <Grid item sm={2}>
                                            <img src={userImage} alt={"comment"} className={classes.commentImage} />
                                        </Grid>

                                        <Grid item sm={9}>
                                            <div className={classes.commentData}>
                                                <Typography
                                                    variant={"h5"}
                                                    component={Link}
                                                    to={`/user/${userHandle}`}
                                                    color={"primary"}
                                                >
                                                    {userHandle}
                                                </Typography>

                                                <Typography
                                                    variant={"body2"}
                                                    color={"textSecondary"}
                                                >
                                                    {dayjs(createdAt).format('h:mm a, MMMM, DD YYYY')}
                                                </Typography>

                                                <hr className={classes.invisibleSeparator} />

                                                <Typography
                                                    variant={"body1"}
                                                >
                                                    {body}
                                                </Typography>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {
                                    index !== comments.length - 1 && (
                                        <hr className={classes.visibleSeparator} />
                                    )
                                }
                            </Fragment>
                        )
                    })
                }
            </Grid>
        );
    }
}

// @ts-ignore
Comments.propTypes = {
    comments: PropTypes.array.isRequired
};

export default withStyles(styles)(Comments);