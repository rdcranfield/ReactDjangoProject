import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getJobs,getAllJobs, deleteJob, applyJob} from '../../actions/jobs';
import {setUserProfileApplication} from '../../actions/auth';

import Popup from "reactjs-popup";
export class Jobs extends Component {
    
    static propTypes = {
        jobs: PropTypes.array.isRequired,
        getJobs: PropTypes.func.isRequired,
        getAllJobs: PropTypes.func.isRequired,
        deleteJob: PropTypes.func.isRequired,
        setUserProfileApplication: PropTypes.func.isRequired,
      
        auth: PropTypes.object.isRequired,
        application: PropTypes.object,
        csrftoken: PropTypes.object
    };

    componentDidMount(){
        const csrftoken = this.getCookie('csrftoken');
        const { user } = this.props.auth;
        const { user_type } = this.props.auth.user_type;

        (user_type) === ('Employee') ? this.props.getAllJobs() : this.props.getJobs();

       
    }
    fileSelectedHandler = e => {
        this.setState({application:  e.target.files[0]});
    };
    onSubmit = e => { e.preventDefault();
        const { user } = this.props.auth; 
        const { application } = this.state; 
        const csrftoken = this.getCookie('csrftoken'); 
        this.props.setUserProfileApplication(user, application, csrftoken);
    };
    getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    render() {
        const { user } = this.props.auth;
        const { user_type } = this.props.auth.user_type;

        const employerViewButton = (
                this.props.jobs.map (job => (
                <tr key={ job.id }>
                    <td>{ job.id }</td>
                    <td>{ job.job_title }</td>
                    <td>{ job.company_name }</td>
                    <td>{ job.employer_email }</td>
                    <td>{ job.job_description }</td>
                    <td><button onClick={ this.props.deleteJob.bind(this, job.id) } className="btn btn-danger btn-sm">Delete Job</button></td>
                </tr>
            )) 
        );
        const employeeViewButton = (
            this.props.jobs.map (job => (
                <tr key={ job.id }>
                    <td>{ job.id }</td>
                    <td>{ job.job_title }</td>
                    <td>{ job.company_name }</td>
                    <td>{ job.employer_email }</td>
                    <td>{ job.job_description }</td>
                    <td>
                        <Popup trigger={<button>Apply</button> }position="right center">
                            <div>  
                                Applying for job: { job.job_title }
                                <form method="post" encType="multipart/form-data" accept="application/pdf" onSubmit={ this.onSubmit }>                               
                                    <input type="file"onChange={this.fileSelectedHandler} onClick={this.fileSelectedHandler}></input>
                                    <button type="submit">send application</button>
                                </form>
                            </div>
                        </Popup>
                    </td>
                </tr>
            )) 
        );
        return (
            <Fragment>
                <h2> Current Jobs </h2>
                <table className="table.table.table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Job Title</th>
                            <th>Company</th>
                            <th>Employer Details</th>
                            <th>Job Description</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                    { (user_type) === ('Employer') ? employerViewButton : employeeViewButton } 
                    </tbody>
                </table>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    jobs: state.jobsReducer.jobsReducer,
    auth: state.authReducer,
})
export default connect(mapStateToProps, { getJobs, getAllJobs, deleteJob, setUserProfileApplication } )(Jobs);
