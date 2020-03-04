import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerUser } from '../../actions/auth';
import { createNotification } from '../../actions/notifications'
import { RadioGroup, RadioButton } from 'react-radio-buttons'

export class Register extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        user_type: 'Employer'
    }
    static propTypes = {
        registerUser: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }
    onChange = e => this.setState({[e.target.name]: e.target.value});
    onRadioChange = type => this.setState({user_type:  type}  );
    onSubmit = e => { e.preventDefault(); 
        
        const { username, email, password, password_confirmation, user_type } = this.state; 
        if(password !== password_confirmation){
            this.props.createNotification(  {passwordsDoNotMatch: "Passwords entered do not match"} );
        }
        const newUser = { username, email, password, user_type };
        this.props.registerUser(newUser);
    };

    render() {
        if(this.props.isAuthenticated){
            return <Redirect to="/" />;
        }
        const { username, email, password, password_confirmation, user_type } = this.state;
        return (
             <div className="card card-body mt-5">
                <form onSubmit={ this.onSubmit }>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" name="username" onChange={ this.onChange } value={ username }/>
                    
                        <label for="email">Email</label>
                        <input type="email" class="form-control" name="email" id="email" onChange={ this.onChange } value={ email }/>
                
                        <label for="password">Password</label>
                        <input type="password" class="form-control" name="password" id="password" onChange={ this.onChange } value={ password } ></input>

                        <label for="password_confirmation">Password Confirmation</label>
                        <input type="password" class="form-control" name="password_confirmation" id="passwordConfirmation" rows="8" onChange={ this.onChange } value={ password_confirmation }></input>                          
                        
                        <RadioGroup name="user_type" onChange={this.onRadioChange} value={user_type} horizontal>
                            <RadioButton name="Employer" value="Employer" defaultChecked >Employer</RadioButton>
                            <RadioButton name="Employee" value="Employee" >Employee</RadioButton>
                        </RadioGroup>
                        
                        <button type="submit" className="btn btn-primary">Sign Up</button>
                        <p>If you already have an account you can <Link to="/login">Login</Link> instead</p>
                    </div>
                </form>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated
})
export default connect(mapStateToProps, {registerUser, createNotification} )(Register)
