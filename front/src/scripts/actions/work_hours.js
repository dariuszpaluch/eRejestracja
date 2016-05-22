import { fetchData, checkManyStatus } from './fetchData';

import {
  ADD_WORK_HOURS_SUCCESS,
  ADD_WORK_HOURS_FAILURE,
  GET_WORK_HOURS_SUCCESS,
  GET_WORK_HOURS_FAILURE
} from './ActionsTypes';

export function getWorkHoursSuccess(data) {
  return {
    type: GET_WORK_HOURS_SUCCESS,
    data
  };
}

export function addWorkHoursSuccess() {
  return {
    type: ADD_WORK_HOURS_SUCCESS,
    data: {
      message: 'Work hours add correctly',
    }
  };
}

export function getWorkHours(id) {
  let url = `/doctors/${ id }/work_hours`;

  return (dispatch) => {
    fetchData(url, 'GET', {}, '')
    .then((data) => {
      if (data.status === 200) {
        dispatch(getWorkHoursSuccess(data.data));
      }
    });
  };
}

export function addWorkHours(data, id) {
  let url = `/doctors/${ id }/work_hours`;
  let body = JSON.stringify({
    work_hours: data
  });

  return (dispatch) => {
    fetchData(url, 'POST', body, '')
    .then(() => {
      dispatch(addWorkHoursSuccess());
    });
  };
}