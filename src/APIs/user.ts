import API from './index';

// get access token with refresh token
async function getAccessToken() {
  try {
    const { data: accessToken } = await API.get<string>('/refresh', {
      withCredentials: true,
    });
    return accessToken;
  } catch (errorMessage) {
    return Promise.reject(errorMessage as string);
  }
}

// login
export type UserInputs = {
  username: string;
  password: string;
};

async function loginUser(userInputs: UserInputs) {
  const { username, password } = userInputs;
  try {
    const { data: accessToken } = await API.post<string>(
      '/auth',
      { username, pass: password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    return accessToken;
  } catch (errorMessage) {
    return Promise.reject(errorMessage as string);
  }
}

// register
async function registerUser(userInputs: UserInputs) {
  const { username, password } = userInputs;
  try {
    await API.post(
      '/register',
      { username, pass: password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (errorMessage) {
    return Promise.reject(errorMessage as string);
  }
}

// logout
async function logoutUser() {
  try {
    await API.get('/logout', { withCredentials: true });
  } catch (errorMessage) {
    return Promise.reject(errorMessage as string);
  }
}

export { getAccessToken, loginUser, registerUser, logoutUser };
