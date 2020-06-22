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
import Profile from "../components/Profile/Profile";

class User extends Component {
    async componentDidMount(): void {
        try {
            const handle = this.props.match.params.handle;
            this.props.getUserProfileData(handle);

            const getUserDetailsResponse = await axios.get(`/user/${handle}`);

            this.setState({
                profile: getUserDetailsResponse.data.user
            });
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        const { screams, loading } = this.props.data;

        const screamsMarkup = loading ? (
            <p>Loading data...</p>
        ) : (
            screams === null ? (
                <p>No screams here yet!</p>
            ) : (
                screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
            )
        );

        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item sm={8} xs={12}>
                        {screamsMarkup}
                    </Grid>
                    <Grid item sm={4} xs={8}>
                        <StaticProfile profile={this.state.profile} />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

User.propTypes = {
    getUserProfileData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    data: state.data
});

const mapActionsToProps = state => {
    getUserProfileData
};


export default User;