import React, {Component} from 'react';
import { Link } from "react-router-dom";  //TODO figure out?

// Material UI imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";


class NavBar extends Component {
    render() {
        return (
            <div>
               <AppBar>
                   <Toolbar className={"nav-container"}>
                       <Button color={"inherit"} component={Link} to={"/"}>Home</Button>
                       <Button color={"inherit"} component={Link} to={"/login"}>Login</Button>
                       <Button color={"inherit"} component={Link} to={"/sign-up"}>Sign Up</Button>
                   </Toolbar>
               </AppBar>
            </div>
        );
    }
}

export default NavBar;