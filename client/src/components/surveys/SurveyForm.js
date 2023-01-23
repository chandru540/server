import _ from 'lodash';
import React, {Component} from "react";
import { reduxForm ,Field} from "redux-form";
import {Link} from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmail from '../../utils/validateEmail';
import formFields from './formFields';


class SurveyForm extends Component{
    renderFields(){
        return _.map(formFields, ({label,name})=>{
            return(
                <Field key={name} title="text" component ={SurveyField} label ={label} name={name}></Field>
            );
        })
    }
    render(){
        return(
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                {this.renderFields()}
                <Link to='/surveys' className='btn-flat white-text red'>Cancel</Link>
                <button type="submit" className='teal btn-flat right white-text'>
                    Next
                <i className='material-icons right'>done</i>
                </button>
                </form>
            </div>
        );
    }
}

function validate(values){
    const errors = {};

    errors.recipients= validateEmail(values.recipients ||'');

   _.each(formFields,({name})=>{

    if(!values[name]){
        errors[name]='You must provide a value';
    }
   });
   

    return errors;
}

export default reduxForm({
    validate:validate,
    form : 'surveyForm',
    destroyOnUnmount : false

})(SurveyForm);