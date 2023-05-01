const SIGNININPUTS = [
  {
    id: 1,
    name: 'username',
    type: 'text',
    label: 'Username',
    placeholder: '',
    required: true,
    errorMessage: 'invalid username',
  },
  {
    id: 2,
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: '',
    required: true,
    errorMessage:
      'must be 3-8 charachter and should include letters and numbers.',
    pattern: '^[a-zA-Z0-9]{3,8}$',
  },
];

// eslint-disable-next-line import/prefer-default-export
export { SIGNININPUTS };
