export const loginInitialValue = {
  email: '',
  password: '',
};

export const resetPasswordInitialValues = {
  email: '',
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

export const signupInitialValues = {
  name: '',
  lastname: '',
  email: '',
  dateOfBirth: new Date(),
  password: '',
  passwordConfirmation: '',
};

export const newEventInitialValues = {
  title: '',
  description: '',
  location: '',
  category: '',
  startDateTime: new Date(),
  finishDateTime: new Date(),
  url: '',
  thumbnailUrl: '',
};

export const acceptImageTypes = {
  'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
};

export const navLinks = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'Events',
    route: '/profile/events',
    subRoutes: [
      {
        route: '/events/create',
        title: 'Create',
        subtitle: `Let's set up one now quickly :)`,
      },
      {
        route: '/profile/events#hosting',
        title: 'Hosting',
        subtitle: 'Events organized and hosted by you',
      },
      {
        route: '/profile/events#attending',
        title: 'Attending',
        subtitle: 'Events you are attending (hosting events are included)',
      },
    ],
  },
  {
    label: 'About Us',
    route: '/about',
  },
  {
    label: 'Collab',
    route: '/collaborate',
  },
];
