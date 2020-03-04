import React, { Component, Fragment } from "react";
import { render } from 'react-dom'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-oldschool-dark";

import { Provider as ReactReduxProvider } from "react-redux";
import store from "../store";
import { loadUser } from '../actions/auth';

import Header from './layout/Header';
import Dashboard from './jobs/Dashboard';

import Alerts from "./layout/Alerts";
import Register from "./useraccounts/Register";
import Login from "./useraccounts/Login";
import PrivateRoute from "./lib/PrivateRoute";

const alertOptions = {
    timeout: 3000,
    position: positions.TOP_CENTER,
    transition: transitions.SCALE,
};

class App extends Component {
    componentDidMount(){
        store.dispatch(loadUser());
    }
    render(){
        return (
            <ReactReduxProvider store = { store }>
                <AlertProvider template={AlertTemplate}{...alertOptions}>
                    <HashRouter>
                        <Fragment>
                            <Header />
                            <Alerts/>
                            <h1> Panda Job Hunter App</h1>
                            
                            <div className="container">
                                <Switch>
                                    <PrivateRoute exact path="/" component={ Dashboard } />
                                    <Route exact path="/register" component={ Register } />
                                    <Route exact path="/login" component={ Login } />
                                </Switch>
                            </div> 
                        </Fragment>
                    </HashRouter>
                </AlertProvider>
            </ReactReduxProvider>  
        )
    }
}

render(<App />, document.getElementById('app'));