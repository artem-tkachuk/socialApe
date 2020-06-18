import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from "react-redux";
import { editUserDetails } from "../redux/actions/userActions";

// Material UI
import {withStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';

import MyButton from '../util/myButton';

// @ts-ignore
const styles = (theme) => ({
    ...theme.styling,
    button: {
        float: 'right'
    }
});

class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    };

    // @ts-ignore
    mapUserDetailsToState  = (credentials) => {
        const { bio, website, location } = credentials;

        this.setState({
            bio: bio ? bio : '',
            website: website ? website : '',
            location: location ? location : '',
        })
    };

    componentDidMount(): void {
        // @ts-ignore
        const { credentials } = this.props;

        this.mapUserDetailsToState(credentials);
    }

    handleOpen = () => {
        this.setState({
            open: true
        });

        // @ts-ignore
        this.mapUserDetailsToState(this.props.credentials);
    };

    handleClose = () => {
        this.setState({
            open: false
        });
    };


    handleChange = (event: { target: { name: any; value: any; }; }) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location,
        };
        // @ts-ignore
        this.props.editUserDetails(userDetails);
        this.handleClose();
    };

    render() {
        // @ts-ignore
        const { classes } = this.props;

        return (
            <Fragment>
                <MyButton tip={"Edit details"} onClick={this.handleOpen} buttonClassName={classes.button}>
                    <EditIcon color={"primary"} />
                </MyButton>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth={"sm"}
                >
                    <DialogTitle>Edit your details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                name={"bio"}
                                type={"text"}
                                label={"Bio"}
                                multiline
                                rows={3}
                                placeholder={"A short bio about yourself"}
                                className={classes.textField}
                                value={this.state.bio}
                                onChange={this.handleChange}
                                fullWidth
                            />

                            <TextField
                                name={"website"}
                                type={"text"}
                                label={"Website"}
                                placeholder={"Your personal/professional website"}
                                className={classes.textField}
                                value={this.state.website}
                                onChange={this.handleChange}
                                fullWidth
                            />

                            <TextField
                                name={"location"}
                                type={"text"}
                                label={"Location"}
                                placeholder={"Where you live?"}
                                className={classes.textField}
                                value={this.state.location}
                                onChange={this.handleChange}
                                fullWidth
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>
                            Cancel
                        </Button>

                        <Button onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

// @ts-ignore
EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

// @ts-ignore
const mapStateToProps = (state) => ({
    credentials: state.user.credentials
});

const mapActionsToProps = {
    editUserDetails
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(EditDetails));