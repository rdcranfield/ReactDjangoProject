import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends Component {

    static propTypes = {
        error: PropTypes.object.isRequired,
        notification: PropTypes.object.isRequired
    };

    componentDidUpdate(previousProps){
        const { error, notification, alert } = this.props;
        if(error !== previousProps.error){
            this.alertCreateJobApplicationError(error, alert);
            this.alertLoginError(error, alert);
            this.alertRegisterError(error, alert);
        }

        if(notification !== previousProps.notification){
           if(notification.jobAdded)
            alert.success(notification.jobAdded);
             if(notification.jobDeleted)
            alert.success(notification.jobDeleted);
            if(notification.passwordsDoNotMatch)
            alert.error(notification.passwordsDoNotMatch);
        }
    };

    alertCreateJobApplicationError(error, alert){
        if(error.message.job_title){
            alert.error('job title: ' + err.message.job_title.toString());
        }
        if(error.message.company_name){
            alert.error('company name: ' + error.message.company_name.toString());
        }
        if(error.message.employer_email){
            alert.error('contact email: ' + error.message.employer_email.toString());
        }
        if(error.message.job_description){
            alert.error('job description: ' + error.message.job_description.toString());
        }
    };
    alertLoginError(error, alert){
        if(error.message.non_field_errors){
            alert.error( error.message.non_field_errors.toString());
        }
    };
    alertRegisterError(error, alert){
        if(error.message.username){
            alert.error(error.message.username.toString());
        }
    };
    render() {
        return (<Fragment />);
    }
}
const mapStateToProps = state => ({
    error: state.errorReducer,
    notification: state.notifyReducer
});

export default connect(mapStateToProps)(withAlert()(Alerts));