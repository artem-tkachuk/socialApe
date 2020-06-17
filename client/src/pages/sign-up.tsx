import React, {Component} from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

// Redux
import { connect } from "react-redux";
import { signUpUser, logOutUser } from "../redux/actions/userActions";

import AppIcon from '../images/icon.png';

// Material UI imports
import {Theme, withStyles} from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";


const styles = (theme: Theme) => ({
    // @ts-ignore
    ...theme.styling
});

class SignUp extends Component {
    constructor() {
        // @ts-ignore
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
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

        const newUserData = {
            // @ts-ignore
            email: this.state.email,
            // @ts-ignore
            password: this.state.password,
            // @ts-ignore
            confirmPassword: this.state.confirmPassword,
            // @ts-ignore
            handle: this.state.handle
        };

        // @ts-ignore
        this.props.signUpUser(newUserData, this.props.history);
    };

    handleChange = (event: { target: { name: any; value: any; }; }) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };


    render() {
        // @ts-ignore
        const { classes, UI : { loading } } = this.props;
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
                            Sign Up
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

                            <TextField
                                id={"confirmPassword"}
                                name={"confirmPassword"}
                                type={"password"}
                                label={"Confirm Password"}
                                className={classes.textField}
                                helperText={errors.confirmPassword}
                                error={!!errors.confirmPassword}
                                // @ts-ignore
                                value={this.state.confirmPassword}
                                onChange={this.handleChange}
                                fullWidth
                            />

                            <TextField
                                id={"handle"}
                                name={"handle"}
                                type={"text"}
                                label={"Handle"}
                                className={classes.textField}
                                helperText={errors.handle}
                                error={!!errors.handle}
                                // @ts-ignore
                                value={this.state.handle}
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
                                // @ts-ignore
                                disabled={this.state.loading}
                            >
                                Sign Up
                                {
                                    // @ts-ignore
                                    this.state.loading && (<CircularProgress size={30} className={classes.progress}/>)
                                }
                            </Button>

                            <br/>

                            <small>
                                Already have an account? Log in <Link to={"/login"}>here</Link>
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
SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    logOutUser: PropTypes.func.isRequired,
    signUpUser: PropTypes.func.isRequired
};

// @ts-ignore
const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    signUpUser,
    logOutUser
};

// @ts-ignore
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(SignUp));