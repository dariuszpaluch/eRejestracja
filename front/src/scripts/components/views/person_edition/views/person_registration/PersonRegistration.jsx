import React, { Component, PropTypes } from 'react';

import { RegistrationBox } from '../../view_content/registration_box';

export default class PersonRegistration extends Component {

  constructor() {
    super();

    this.state = {
      values: {
        password: '',
        repeatPassword: '',
        name: '',
        surname: '',
        email: '',
        pesel: '',
        specialization: ''
      },
      errors: {
        password: '',
        repeatPassword: '',
        name: '',
        surname: '',
        email: '',
        pesel: '',
        specialization: ''
      },
      errorsMessages: {
        password: 'aaa',
        repeatPassword: 'aaa',
        name: 'aaa',
        surname: 'aaa',
        email: 'aaa',
        pesel: 'aaa',
        specialization: 'aaaa'
      }
    };
  }

  onSignUp() {
    this.props.onSignUp(this.state.values);
  }

  onChange(type, value) {
    let { values, errors, errorsMessages } = this.state;

    errors[type] = value.length > 0 ? '' : errorsMessages[type];
    values[type] = value;
    this.setState({
      values,
      errors
    });
  }

  render() {
    let { values, errors } = this.state;
    let { personType, onSignUp, title } = this.props;

    return (
      <RegistrationBox
        personType={ personType }
        onSignUp={ onSignUp }
        values={ values }
        errors={ errors }
        onChange={ this.onChange.bind(this) }
        title={ title }
      />
    );
  }
}

PersonRegistration.propTypes = {
  onSignUp: PropTypes.func,
  personType: PropTypes.oneOf([ 'patient', 'doctor' ]),
  title: PropTypes.string
};