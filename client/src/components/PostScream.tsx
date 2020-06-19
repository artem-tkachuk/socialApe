import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from "react-redux";
import { postScream } from "../redux/actions/dataActions";

// Components
import MyButton from '../util/myButton';

// Material UI
import {withStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from "@material-ui/core/CircularProgress";

// Icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close'

// @ts-ignore
const styles = (theme) => ({
    ...theme.styling,
    submitButton: {
        position: 'relative'
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '10%'
    }
});


class PostScream extends Component {
    state = {
        open: false,
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
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({
                body: ''
            });

            this.handleClose();
        }
    }

    handleOpen = () => {
        this.setState({
            open: true
        });
    };

    handleClose = () => {
        this.setState({
            open: false,
            errors: {}
        });
    };
    // @ts-ignore
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    // @ts-ignore
    handleSubmit = (event) => {
        event.preventDefault();
        // @ts-ignore
        this.props.postScream({
            body: this.state.body
        });
    };

    render() {
        const { errors } = this.state;
        // @ts-ignore
        const { classes, UI: { loading } } = this.props;

        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip={"Post a new scream!"}>
                    <AddIcon />
                </MyButton>

                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth={"sm"}>
                    <MyButton tip={"Close"} onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>

                    <DialogTitle>Post a new scream!</DialogTitle>

                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name={"body"}
                                type={"text"}
                                label={"SCREAM!"}
                                multiline rows={3}
                                placeholder={"Scream at your fellow apes!"}
                                // @ts-ignore
                                error={!!errors.body}
                                // @ts-ignore
                                helperText={errors.body}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                            />

                            <Button
                                type={"submit"}
                                variant={"contained"}
                                color={"primary"}
                                className={classes.submitButton}
                                disabled={loading}
                            >
                                SCREAM!!!!

                                {loading && (
                                        <CircularProgress size={30} className={classes.progressSpinner}/>
                                    )
                                }
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}

// @ts-ignore
PostScream.propTypes = {
    postScream: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
};

const mapPropsToActions = ({
    postScream
});

// @ts-ignore
const mapStateToProps = (state) => ({
    UI: state.UI
});

export default connect(mapStateToProps, mapPropsToActions)(withStyles(styles)(PostScream));