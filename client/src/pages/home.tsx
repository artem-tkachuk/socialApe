import React, {Component} from 'react';
import axios from 'axios';
import Grid from "@material-ui/core/Grid";
import Scream from '../components/Scream';

import Profile from '../components/Profile';

//interface
import {ScreamInterface} from "../interfaces/screamInterface";

class Home extends Component {
    state = {
        screams: []
    };

    async componentDidMount() {
        try {
            const screams = await axios.get('/screams');
            this.setState({
                screams: screams.data
            })
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        let recentScreamsMarkup = this.state.screams !== [] ? (
            this.state.screams.map((scream: ScreamInterface) => <Scream key={scream.screamId} scream={scream}/>)
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

export default Home;