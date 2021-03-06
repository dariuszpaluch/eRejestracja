import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as Action from '../../../../actions/Actions';
import * as doctorsReducer from '../../../../reducers/doctors';

import EntityList from '../EntityList';

class SmartDoctorsList extends Component {
  constructor() {
    super();

    this.state = {
      doctorsModel: {
        name: { type: String },
        surname: { type: String },
        email: { type: String },
        specialization: { type: String },
      },
      selected: []
    };
  }

  componentDidMount() {
    this.props.dispatch(Action.fetchDoctorsList());
  }

  onEdit(id) {
    this.context.router.push(`/doctor-edition/${ id }`);
  }
  _handleSelect(selected) {
    this.setState({
      selected
    });
  }

  _cleanSelected() {
    this.setState({
      selected: []
    });
  }

  _onRemove() {
    let { selected } = this.state;
    let { doctorsList } = this.props;
    let ids = [];

    selected.forEach((index) => {
      ids.push(doctorsList[index].id);
    });

    this.props.dispatch(Action.deleteDoctors(ids));
    this._cleanSelected();
  }

  onDeleteItem(id) {
    this.props.dispatch(Action.deleteDoctors([ id ]));
  }

  render() {
    let {
      doctorsModel,
      selected
    } = this.state;

    let { doctorsList } = this.props;

    return (
      <EntityList
        title="DOCTORS LIST"
        subtitle="You can remove doctor or edit."
        model={ doctorsModel }
        source={ doctorsList }
        onSelect={ this._handleSelect.bind(this) }
        selected={ selected }
        buttons={ [
          { label: 'Remove selected doctors', onClick: this._onRemove.bind(this), primary: true }
        ] }
        onDeleteItem={ this.onDeleteItem.bind(this) }
        noDataMessage="No doctors in database"
        onEditItem={ this.onEdit.bind(this) }
      />
    );
  }
}

SmartDoctorsList.contextTypes = {
  router: React.PropTypes.object
};

SmartDoctorsList.propTypes = {
  doctorsList: PropTypes.array
};

SmartDoctorsList.defaultProps = {
  doctorsList: []
};

function select(state) {
  state = state.toJS();
  return {
    doctorsList: doctorsReducer.getDoctorsList(state)
  };
}

export default connect(select)(SmartDoctorsList);
