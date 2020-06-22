import React, {Component} from 'react';

import PropTypes from 'prop-types';

//Material UI imports
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

// Redux
import { connect } from "react-redux";
import { submitComment, clearErrors } from "../../redux/actions/dataActions";

// @ts-ignore
const styles = theme => ({
    ...theme.styling,
    commentFormGrid: {
        textAlign: 'center'
    }
});


class CommentForm extends Component {
    state = {
        body: '',
        errors: {}
    };

    componentWillReceiveProps(nextProps: Readonly<{}>, nextContext: any): void {
        // @ts-ignore
        if (nextProps.UI.errors) {
            this.setState({
                // @ts-ignore
                errors: nextProps.UI.errors
            });
        }

        // @ts-ignore
        if (nextProps.UI.errors !== {}  && !nextProps.UI.loading) {
            this.setState({
                body: ''
            });
        }
    };

    // @ts-ignore
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    // @ts-ignore
    handleSubmit = (event) => {
        event.preventDefault();
        // @ts-ignore
        this.props.submitComment(
            // @ts-ignore
            this.props.screamId,
            {
                body: this.state.body
            }
        );

        // @ts-ignore
        this.props.clearErrors();
    };

    render() {
        // @ts-ignore
        const { classes, authenticated } = this.props;
        const errors = this.state.errors;

        const commentFormMarkup = authenticated ? (
            <Grid item sm={12} className={classes.commentFormGrid}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        name={"body"}
                        type={"text"}
                        label={"Comment on scream"}
                        // @ts-ignore
                        error={!!errors.comment}
                        // @ts-ignore
                        helperText={errors.comment}
                        value={this.state.body}
                        onChange={this.handleChange}
                        fullWidth
                        className={classes.textField}
                    />

                    <Button
                        type={"submit"}
                        color={"primary"}
                        className={classes.button}
                    >
                        Submit
                    </Button>
                </form>

                <hr className={classes.visibleSeparator} />
            </Grid>
        ) : (
            ''
        );

        return commentFormMarkup;
    }
}

// @ts-ignore
CommentForm.propTypes = {
    clearErrors: PropTypes.func.isRequired,
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired
};

// @ts-ignore
const mapStateToProps = state => ({
    UI: state.UI,
    authenticated: state.user.authenticated
});

const mapActionsToProps = {
    submitComment,
    clearErrors
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CommentForm));