import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { PersonEdition } from '../views/person_edition';
import * as Action from '../../../../actions/Actions';
import * as UserReducer from '../../../../reducers/user';

export default class SmartUserProfileEdition extends Component {
  onSaveProfileData(values) {
    let { personType, userId } = this.props;
    let parameters = {
      id: userId,
      name: values.name,
      surname: values.surname,
      pesel: values.pesel,
      email: values.email,
      specialization: values.specialization
    };

    this.props.dispatch(Action.changeProfileData(parameters, personType));
  }

  onChangePassword(values) {
    let { userId } = this.props;
    let parameters = {
      old_password: values.oldPassword,
      new_password: values.password
    };

    this.props.dispatch(Action.changeUserPassword(parameters, userId));
  }

  render() {
    return (
      <PersonEdition
        personType={ this.props.personType }
        values={ this.props.values }
        onSave={ this.onSaveProfileData.bind(this) }
        onChangePassword={ this.onChangePassword.bind(this) }
        changePassword
      />
    );
  }
}

function select(state) {
  state = state.toJS();
  return {
    personType: UserReducer.getUserType(state),
    values: UserReducer.getUserData(state),
    userId: UserReducer.getUserId(state)
  };
}

SmartUserProfileEdition.propTypes = {
  personType: PropTypes.oneOf([ 'patient', 'doctor', 'admin' ]),
  values: PropTypes.object,
  userId: PropTypes.number
};

export default connect(select)(SmartUserProfileEdition);
