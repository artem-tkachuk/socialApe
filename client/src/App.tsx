import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch  } from "react-router-dom";

import jwtDecode from 'jwt-decode';
import axios from 'axios';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from "./styles/theme";
import './App.css';

//Redux
import { Provider } from "react-redux";
import store from './redux/store';
import { SET_AUTHENTICATED } from "./redux/types";
import { getUserData, logOutUser } from "./redux/actions/userActions";

// Pages
import Home from "./pages/home";
import Login from "./pages/login";
import SignUp from "./pages/sign-up";
import User from "./pages/user";

// Components
import AuthRoute from './components/util/authRoute';
import NavBar from "./components/Layout/NavBar";

axios.defaults.baseURL = "https://us-central1-socialape-ea8b3.cloudfunctions.net/api";


const token  = localStorage.firebaseIdToken;

if (token) {
    const decodedIdToken = jwtDecode(token);

    console.log(decodedIdToken);

    // @ts-ignore
    if (decodedIdToken.exp * 1000 < Date.now()){
        store.dispatch(logOutUser());

        window.location.href = '/login';
    } else {
        store.dispatch({
            type: SET_AUTHENTICATED
        });

        axios.defaults.headers.common['Authorization'] = token;

        store.dispatch(getUserData());
    }
}

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                    <Router>
                        <NavBar />

                        <div className={"container"}>
                            <Switch>
                                <Route exact path={"/"} component = {Home} />

                                <AuthRoute
                                    exact
                                    path = {"/login"}
                                    component = {Login}
                                />

                                <AuthRoute
                                    exact
                                    path = {"/sign-up"}
                                    component= {SignUp}
                                />

                                <Route exact path={"/users/:handle"} component={User} />

                                <Route exact path={`/users/:handle/screams/:screamId`} component={User} />
                            </Switch>
                        </div>
                    </Router>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;

