import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import dateformat from 'dateformat';

import {
  CardWithHeader,
  Table,
  Grid,
  GridItem
} from 'ui';

import * as userReducer from 'reducers/user';
import * as visitsReducer from 'reducers/visits';

import * as Actions from 'actions/Actions';

class VisitsList extends Component {

  constructor() {
    super();
    this.state = {
      model: {
        doctor: { type: String },
        day: { type: String },
        start: { type: String },
        end: { type: String }
      },
      source: [],
      selected: [],
      downloadedVisits: false
    };
  }

  componentDidMount() {
    let { userId, userType } = this.props;

    this.getVisitsList(userId, userType);
  }

  componentWillReceiveProps(nextProps) {
    let { userId, userType } = nextProps;

    this.getVisitsList(userId, userType);
    let source = nextProps.visits.map((item) => {
      return {
        id: item.id,
        doctor: item.doctorId,
        day: this.generateDateLabel(item.start),
        start: dateformat(item.start, 'HH:MM'),
        end: dateformat(item.end, 'HH:MM')
      };
    });

    this.setState({
      source
    });
  }

  getVisitsList(userId, userType) {
    if (userId > 0 && !this.state.downloadedVisits) {
      this.props.dispatch(Actions.getVisitsList(userId, userType));
      this.setState({
        downloadedVisits: true
      });
    }
  }

  generateDateLabel(date) {
    return dateformat(date, 'dddd, mmmm dS, yyyy');
  }

  onSelect(value) {
    this.setState({
      selected: value
    });
  }

  onDeleteItem(id) {
    this.props.dispatch(Actions.deleteVisit(id));
  }

  render() {
    let { model, source, selected } = this.state;

    return (
      <Grid center>
        <GridItem xsSize="6">
          <CardWithHeader
            title={ "Your visits" }
          >
            <Table
              model={ model }
              source={ source }
              onSelect={ this.onSelect.bind(this) }
              selected={ selected }
              selectable={ false }
              onDeleteItem={ this.onDeleteItem.bind(this) }
            />
          </CardWithHeader>
        </GridItem>
      </Grid>
    );
  }
}

VisitsList.propTypes = {
  userId: PropTypes.number,
  visits: PropTypes.array,
  userType: PropTypes.oneOf([ 'doctor', 'patient' ])
};

function select(state) {
  state = state.toJS();
  return {
    userId: userReducer.getUserId(state),
    userType: userReducer.getUserType(state),
    visits: visitsReducer.getVisitsData(state).visits
  };
}

export default connect(select)(VisitsList);