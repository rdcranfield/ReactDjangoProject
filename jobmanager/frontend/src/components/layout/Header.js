import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth'

export class Header extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired,
        // isAuthenticated: PropTypes.bool
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const memberViewLinks = (
            <div>
                <ul className="navbar-nav mr-auto mt-2 mt-lg-1">          
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <button onClick={this.props.logout} className="nav-link">Logout</button>
                    </li>    
                </ul>
                    <li> 
                        <span className="navbar-text">
                            <p>{user ?`Welcome back ${user.username }` : ''}</p>
                        </span>
                    </li>
            </div>
        );

        const guestViewLinks = (
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
                <Link to="/register" className="nav-link">Register</Link>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#/login">Login</a>
            </li>
        </ul> 
        )

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <a className="navbar-brand" href="#">Panda Job Huntersz</a>
                { isAuthenticated ? memberViewLinks : guestViewLinks } 
            </div>
            </div>
            </nav>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.authReducer
})
export default connect(mapStateToProps, {logout} )(Header);
