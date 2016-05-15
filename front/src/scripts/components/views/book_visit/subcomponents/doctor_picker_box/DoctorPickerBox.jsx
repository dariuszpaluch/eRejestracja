import React, { Component, PropTypes } from 'react';

import {
  CardWithHeader,
  Dropdown
} from '../../../../ui';

import {
  PickerBox
} from '../';

export default class BookVisitBox extends Component {
  constructor() {
    super();
    this.state = {
      labels: {
        specialization: 'Choose doctor type',
        doctor: 'Choose a doctor you want to visit.',
        doctorDescription: 'This doctor takes on Monday and Thursday'
      },
      errors: {
        doctor: '',
        specialization: ''
      },
      errorsMessages: {
        doctor: 'Please choose doctor.',
        specialization: 'Please choose specialization.'
      }
    };
  }

  _onPrepareDoctors(doctors) {
    return doctors.map((doctor) => {
      return {
        value: doctor.id,
        label: `${ doctor.name } - ${ doctor.specialization }`
      };
    });
  }

  _onPrepareSpecializations(specializations) {
    return specializations.map((specialization) => {
      return {
        value: specialization.value,
        label: specialization.name
      };
    });
  }

  setError(key) {
    let { errors, errorsMessages } = this.state;

    errors[key] = errorsMessages[key];
    this.setState({
      errors
    });
  }

  onNextStep() {
    let { selectedDoctorId, selectedSpecialization } = this.props;

    if (selectedSpecialization.length === 0) {
      this.setError('specialization');
    }
    else if (selectedDoctorId === 0) {
      this.setError('doctor');
    }
    else {
      this.props.onNextStep();
    }
  }

  render() {
    let { labels, errors } = this.state;
    let {
      sources,
      selectedDoctorId,
      selectedSpecialization,
      onDoctorChange,
      onSpecializationChange,
      onNextStep,
      onBackStep
    } = this.props;

    return (
      <PickerBox
        title="Book visit to doctor."
        subtitle="You can select doctor and book a visit on select term."
        onNextStep={ this.onNextStep.bind(this) }
        onBackStep={ onBackStep }
      >
        <Dropdown
          source={ this._onPrepareSpecializations(sources.specializations) }
          label={ labels.specialization }
          value={ selectedSpecialization }
          error={ errors.specialization }
          onChange={ onSpecializationChange.bind(this) }
        />
        <Dropdown
          source={ this._onPrepareDoctors(sources.doctors) }
          label={ labels.doctor }
          value={ selectedDoctorId }
          error={ errors.doctor }
          onChange={ onDoctorChange.bind(this) }
          disabled={ selectedSpecialization.length === 0 }
        />
      </PickerBox>
    );
  }
}

BookVisitBox.propTypes = {
  sources: PropTypes.object,
  selectedDoctorId: PropTypes.number,
  doctors: PropTypes.array,
  selectedSpecialization: PropTypes.string,
  onDoctorChange: PropTypes.func,
  onSpecializationChange: PropTypes.func,
  onNextStep: PropTypes.func,
  onBackStep: PropTypes.func
};