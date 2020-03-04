import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addJob } from '../../actions/jobs';

export class AddJob extends Component {
    state = {
        job_title: "",
        company_name: "",
        employer_email: "",
        job_description: ""
    }

    static propTypes = {
        addJob: PropTypes.func.isRequired
    };
    
    onChange = e => this.setState({[e.target.name]: e.target.value});
    onSubmit = e => { e.preventDefault(); 
        
        const { job_title, company_name, employer_email, job_description } = this.state; 
        const job = { job_title, company_name, employer_email, job_description };
        this.props.addJob(job);
        this.resetState();
    };

    resetState = () => this.setState({ job_title:"", company_name:"",  employer_email: "",  job_description: ""});
    render() {
        const { job_title, company_name, employer_email, job_description } = this.state;
        return (
            <div className="col-md-7 mb-5">
                <h2>Add a Job</h2>
                <form onSubmit={ this.onSubmit }> 
                    <div className="form-group">
                        <label>Job Title</label>
                        <input type="text" className="form-control" name="job_title" onChange={this.onChange} value={job_title}/>
                    
                        <label for="company_name">Company Name</label>
                        <input type="text" class="form-control" name="company_name" id="company_name" onChange={this.onChange} value={company_name}/>
                   
                        <label for="employer_email">Contact Email</label>
                        <input type="email" class="form-control" name="employer_email" id="employer_email" aria-describedby="emailHelp" onChange={ this.onChange } value={ employer_email } ></input>
                        <small id="emailHelp" class="form-text text-muted">Allows potential employees to contact directly.</small>
                  
                        <label for="job_description">Job Description</label>
                        <textarea class="form-control" name="job_description" id="job_description" rows="8" onChange={this.onChange} value={job_description}></textarea>                    
                 
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect( null, { addJob } )(AddJob)