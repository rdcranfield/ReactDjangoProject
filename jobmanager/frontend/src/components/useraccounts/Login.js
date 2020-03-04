import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
export class Login extends Component {
    state = {
        username: '',
        password: '',
    }

    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }
    onChange = e => this.setState({ [e.target.name]: e.target.value });
    onSubmit = e => { e.preventDefault(); 
        this.props.login(this.state.username, this.state.password);
    };

    render() {
        if(this.props.isAuthenticated){
            return <Redirect to="/" />;
        }
        const { username, password  } = this.state;
        return (
             <div className="card card-body mt-15">
                <form onSubmit={ this.onSubmit }>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" name="username" onChange={ this.onChange } value={ username }></input>
                
                        <label for="password">Password</label>
                        <input type="password" class="form-control" name="password" id="password" onChange={ this.onChange } value={ password } ></input>

                        <button type="submit" className="btn btn-primary">Login</button>
                        <p>Or <Link to="/register">Sign Up</Link> first</p>
                    </div>
                </form>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated
})
export default connect(mapStateToProps, { login } )(Login)
