import { fetchData } from './fetchData';
import Qs from 'qs';

export function changeProfileData(parameters, id, type) {
  let userType = type === 'doctor' ? 'doctors' : 'patients';
  let url = `/${ userType }/${ id }`;
  let body = JSON.stringify(
    parameters
  );

  return (dispatch) => {
    fetchData(url, 'PUT', body, '')
    .then((data) => {
      // dispatch(addDoctorToStore(data));
    });
  };
}