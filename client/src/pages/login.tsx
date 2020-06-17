import React, {Component} from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import {Theme, withStyles} from "@material-ui/core";


import AppIcon from '../images/icon.png';

// Material UI imports
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";

//Redux
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const styles = (theme: Theme) => ({
    // @ts-ignore
    ...theme.styling
});

class Login extends Component {
    constructor() {
        // @ts-ignore
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps: Readonly<{}>, nextContext: any): void {
        // @ts-ignore
        if (nextProps.UI.errors) {
            this.setState({
                // @ts-ignore
                errors: nextProps.UI.errors
            });
        }
    }

    // @ts-ignore
    handleSubmit = async (event) => {
        event.preventDefault();

        const userData = {
            // @ts-ignore
            email: this.state.email,
            // @ts-ignore
            password: this.state.password
        };

        // @ts-ignore
        this.props.loginUser(userData, this.props.history);
    };

    handleChange = (event: { target: { name: any; value: any; }; }) => {
        this.setState({
           [event.target.name]: event.target.value
        });
    };


    render() {
        // @ts-ignore
        const { classes, UI: { loading } } = this.props;
        // @ts-ignore
        const { errors } = this.state;

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
                                {
                                    loading && (<CircularProgress size={30} className={classes.progress }/>)   //TODO fix
                                }
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
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToPros = (state: { user: any; UI: any; }) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
};

// @ts-ignore
export default connect(mapStateToPros, mapActionsToProps)(withStyles(styles)(Login));