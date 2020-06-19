import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";

import Grid from "@material-ui/core/Grid";

import Scream from '../components/Scream';
import Profile from '../components/Profile';

//interface
import {ScreamInterface} from "../interfaces/screamInterface";

class Home extends Component {
    componentDidMount() {
        // @ts-ignore
        this.props.getScreams();
    }

    render() {
        // @ts-ignore
        const { screams, loading } = this.props.data;

        let recentScreamsMarkup = !loading ? (
            // @ts-ignore
            screams.map((scream: ScreamInterface) => <Scream key={scream.screamId} scream={scream} />)
        ) : <p>Loading...</p>;

        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item sm={8} xs={12}>
                        {recentScreamsMarkup}
                    </Grid>
                    <Grid item sm={4} xs={8}>
                        <Profile />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

// @ts-ignore
Home.propTypes = {
    getScreams: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

// @ts-ignore
const mapStateToProps = state => ({
  data: state.data
});

const mapActionsToProps = {
    getScreams
};

export default connect(mapStateToProps, mapActionsToProps)(Home);