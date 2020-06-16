import React, {Component} from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import axios from 'axios';

import { withStyles } from "@material-ui/core";


import AppIcon from '../images/icon.png';
import styles from "../styles/login";

// Material UI imports
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";


class Login extends Component {
    constructor() {
        // @ts-ignore
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {}
        }
    }

    // @ts-ignore
    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });

        const userData = {
            // @ts-ignore
            email: this.state.email,
            // @ts-ignore
            password: this.state.password
        };

        try {
            this.setState({
                loading: false
            });

            const data = await axios.post('/login', userData);

            console.log(data.data);

            // @ts-ignore
            this.props.history.push('/');
        } catch (err) {
            this.setState({
                errors: err.response.data,
                loading: false
            })
        }
    };

    handleChange = (event: { target: { name: any; value: any; }; }) => {
        this.setState({
           [event.target.name]: event.target.value
        });
    };


    render() {
        // @ts-ignore
        const { classes } = this.props;
        // @ts-ignore
        const { errors, loading } = this.state;

        return (
            <div>
                <Grid container className={classes.form}>
                    <Grid item sm />

                    <Grid item sm>
                        <img
                            src={AppIcon}
                            alt={"Monkey (App logo)"}
                            className={classes.image}
                        />

                        <Typography variant={"h1"} className={classes.pageTitle}>
                            Login
                        </Typography>

                        <form noValidate onSubmit={this.handleSubmit}>
                            <TextField
                                id={"email"}
                                name={"email"}
                                type={"email"}
                                label={"Email"}
                                className={classes.textField}
                                helperText={errors.email}
                                error={!!errors.email}
                                // @ts-ignore
                                value={this.state.email}
                                onChange={this.handleChange}
                                fullWidth
                            />

                            <TextField
                                id={"password"}
                                name={"password"}
                                type={"password"}
                                label={"Password"}
                                className={classes.textField}
                                helperText={errors.password}
                                error={!!errors.password}
                                // @ts-ignore
                                value={this.state.password}
                                onChange={this.handleChange}
                                fullWidth
                            />

                            {errors.general && (
                                <Typography variant={"body2"} className={classes.customError}>
                                    {errors.general}
                                </Typography>
                            )}

                            <Button
                                type={"submit"}
                                variant={"contained"}
                                color={"primary"}
                                className={classes.button}
                                disabled={loading}
                            >
                                Login
                                {loading && (<CircularProgress size={30} className={classes.progress }/>) }
                            </Button>

                            <br/>

                            <small>
                                Don't have an account? Sign up <Link to={"/sign-up"}>here</Link>
                            </small>
                        </form>
                    </Grid>

                    <Grid item sm />
                </Grid>
            </div>
        );
    }
}

// @ts-ignore
Login.propTypes = {
    classes: PropTypes.object.isRequired
};

// @ts-ignore
export default withStyles(styles)(Login);