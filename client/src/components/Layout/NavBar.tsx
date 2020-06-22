import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from "react-router-dom";  //TODO figure out?

// Material UI imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import MyButton from '../util/myButton';
import PostScream from "../Scream/PostScream";

// Icons
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';

class NavBar extends Component {
    render() {
        // @ts-ignore
        const { authenticated } = this.props;

        return (
            <div>
               <AppBar>
                   <Toolbar className={"nav-container"}>
                       {
                           authenticated ? (
                               <Fragment>
                                   <PostScream />

                                   <Link to={"/"}>
                                       <MyButton tip={"Home"} onClick={""}>
                                           <HomeIcon />
                                       </MyButton>
                                   </Link>

                                   <MyButton tip={"Notifications"} onClick={""}>
                                       <NotificationsIcon />
                                   </MyButton>
                               </Fragment>
                           ) : (
                               <Fragment>
                                   <Button color={"inherit"} component={Link} to={"/"}>Home</Button>
                                   <Button color={"inherit"} component={Link} to={"/login"}>Login</Button>
                                   <Button color={"inherit"} component={Link} to={"/sign-up"}>Sign Up</Button>
                               </Fragment>
                           )
                       }
                   </Toolbar>
               </AppBar>
            </div>
        );
    }
}

// @ts-ignore
NavBar.propTypes = {
    authenticated: PropTypes.bool.isRequired
};

// @ts-ignore
const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(NavBar);