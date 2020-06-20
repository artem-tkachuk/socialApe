import * as React from 'react';

// Components
import PropTypes from 'prop-types';
import {Component, Fragment} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import MyButton from './util/myButton';
import Button from "@material-ui/core/Button";

// Redux
import { connect } from "react-redux";
import { deleteScream } from "../redux/actions/dataActions";


import { withStyles } from "@material-ui/core";

// Icons
import DeleteOutline from '@material-ui/icons/DeleteOutline';

// Styles
const styles = {

    deleteButton: {
        position: 'absolute',
        left: '90%',
        top: '10%'
    }
};

class DeleteScream extends Component {
    state = {
        open: false
    };

    handleOpen = () => {
        this.setState({
            open: true
        });
    };

    handleClose = () => {
        this.setState({
            open: false
        });
    };

    deleteScream = () => {
        // @ts-ignore
        this.props.deleteScream(this.props.screamId);

        this.setState({
            open: false
        });
    };

    render() {
        // @ts-ignore
        const { classes } = this.props;

        return (
            <Fragment>
                <MyButton tip={"Delete scream"} onClick={this.handleOpen} buttonClassName={classes.deleteButton}>
                    <DeleteOutline color={"secondary"} />
                </MyButton>

                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth={"sm"}>
                    <DialogTitle> Are you sure that you want to delete this scream? </DialogTitle>
                    <DialogContent> This action cannot be undone! </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color={"primary"}>Cancel</Button>
                        <Button onClick={this.deleteScream} color={"secondary"}>Delete scream</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

// @ts-ignore
DeleteScream.propTypes = {
    deleteScream: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired
};

const mapActionsToProps = {
    deleteScream
};

// @ts-ignore
export default connect(null, mapActionsToProps)(withStyles(styles)(DeleteScream));