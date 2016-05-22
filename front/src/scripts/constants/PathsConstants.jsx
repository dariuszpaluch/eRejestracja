const Paths = {
  root: '/',
  dashboard: '/dashboard',
  notFound: '*',
  navigation: '/navigation',
  login: '/login',
  demo: '/demo',
  userPanel: '/testingUserPanel',
  doctorsList: '/doctors-list',
  patients: {
    list: '/patients-list',
    bookVisit: '/book-visit',
    registration: '/patient-registration',
    add: '/add-patient',
    edition: '/patient-edition/:id'
  },
  doctors: {
    list: '/doctors-list',
    registration: '/doctor-registration',
    add: '/add-doctor',
    edition: '/doctor-edition/:id',
    workHours: '/doctor-work-hours'
  },
  settings: {
    myProfile: '/my-profile',
    logout: '/logout'
  }
};

export default Paths;