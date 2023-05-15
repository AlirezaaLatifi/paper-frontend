import API from './index';

// get access token with refresh token
async function getAccessToken() {
  try {
    const { data } = await API.get('/refresh', {
      withCredentials: true,
    });
    return { isSuccess: true, accessToken: data.accessToken };
  } catch (errorMessage) {
    return { isSuccess: false };
  }
}

// login
async function loginUser(userInputs) {
  const { username, password } = userInputs;

  try {
    const { data } = await API.post(
      '/auth',
      { username, pass: password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    return { isSuccess: true, accessToken: data.accessToken };
  } catch (errorMessage) {
    return { isSuccess: false, message: errorMessage };
  }
}

// register
async function registerUser(userInputs) {
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
    return { isSuccess: true };
  } catch (errorMessage) {
    return { message: errorMessage, isSuccess: false };
  }
}

// logout
async function logoutUser() {
  try {
    await API.get('/logout', { withCredentials: true });
    return { isSuccess: true };
  } catch (err) {
    return { isSuccess: false };
  }
}

export { getAccessToken, loginUser, registerUser, logoutUser };
