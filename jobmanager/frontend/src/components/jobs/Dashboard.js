import React, { Component, Fragment } from 'react'
import AddJob from './AddJob';
import Jobs from './Jobs';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { render } from 'react-dom';

export class Dashboard extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    };
    render() {
        const { user_type } = this.props.auth.user_type;

        const employerView = (
            <Fragment>
                <AddJob />
                <Jobs />
            </Fragment>
        );
        const employeeView = (
            <Fragment>
                <Jobs />
            </Fragment>
        );
        return (
             (user_type) === ('Employer') ? employerView : employeeView 
        )
    }
}
const mapStateToProps = state => ({
    auth: state.authReducer
})

export default connect(mapStateToProps )(Dashboard);
