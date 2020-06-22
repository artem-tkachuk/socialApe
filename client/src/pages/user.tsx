import React, {Component} from 'react';
import PropTypes from 'prop-types';

//Redux
import { connect } from "react-redux";
import { getUserProfileData } from "../redux/actions/dataActions";

//Components
import Scream from "../components/Scream/Scream";

// Libraries
import axios from 'axios';

// Material UI imports
import Grid from "@material-ui/core/Grid";
import StaticProfile from "../components/Profile/StaticProfile";
import {withStyles} from "@material-ui/core";
import ScreamSkeleton from "../components/util/ScreamSkeleton";
import ProfileSkeleton from "../components/util/ProfileSkeleton";

// styles
// @ts-ignore
const styles = theme => ({
    ...theme.styling
});

class User extends Component {
    state = {
        profile: null,
        screamIdParam: null
    };

    async componentDidMount() {
        try {
            // @ts-ignore
            const handle = this.props.match.params.handle;
            // @ts-ignore
            const screamId = this.props.match.params.screamId;

            if (screamId) {
                this.setState({
                    screamIdParam: screamId
                });
            }

            // @ts-ignore
            this.props.getUserProfileData(handle);

            const getUserDetailsResponse = await axios.get(`/user/${handle}`);

            console.log(`User details!`);

            this.setState({
                profile: getUserDetailsResponse.data.credentials
            });
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        // @ts-ignore
        const { screams, loading } = this.props.data;
        const { screamIdParam } = this.state;

        const screamsMarkup = loading ? (   //TODO fix the new comment action
            <ScreamSkeleton />
        ) : (
            screams === null ? (
                <p>No screams here yet!</p>
            ) : !screamIdParam ? (
                // @ts-ignore
                screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
            ) : (
                // @ts-ignore
                screams.map(scream => {
                    if (scream.screamId !== screamIdParam) {
                        // @ts-ignore
                        return <Scream key={scream.screamId} scream={scream} />
                    } else {
                        // @ts-ignore
                        return <Scream key={scream.screamId} scream={scream} openDialog />
                    }
                })
            )
        );

        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item sm={8} xs={12}>
                        {screamsMarkup}
                    </Grid>
                    <Grid item sm={4} xs={8}>
                        {
                            this.state.profile === null ? (
                                <ProfileSkeleton />
                            ) : (
                                <StaticProfile
                                    // @ts-ignore
                                    profile={this.state.profile}
                                />
                            )
                        }
                    </Grid>
                </Grid>
            </div>
        );
    }
}

// @ts-ignore
User.propTypes = {
    getUserProfileData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

// @ts-ignore
const mapStateToProps = state => ({
    data: state.data
});

// @ts-ignore
const mapActionsToProps = {
    getUserProfileData
};


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(User));