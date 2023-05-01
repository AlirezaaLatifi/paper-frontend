import API from './index';

// get access token with refresh token
async function getAccessToken() {
  try {
    const { data } = await API.get('/refresh', {
      withCredentials: true,
    });
    return { isSuccess: true, accessToken: data.accessToken };
  } catch (error) {
    return { isSuccess: false };
  }
}

// login
async function loginUser(userInputs) {
  const { username, password } = userInputs;
  const response = await fetch('http://localhost:7575/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ username, pass: password }),
  });

  if (response.status >= 500) {
    return {
      message: 'Something went wrong, Try agian later.',
      isSuccess: false,
    };
  }

  if (response.status !== 200) {
    const { message } = await response.json();
    return { message, isSuccess: false };
  }

  const { accessToken } = await response.json();
  return { accessToken, isSuccess: true };
}

// register
async function registerUser(userInputs) {
  const { username, password } = userInputs;
  const response = await fetch('http://localhost:7575/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, pass: password }),
  });

  if (response.status !== 201) {
    const { message } = await response.json();
    return { message, isSuccess: false };
  }

  return { isSuccess: true };
}

// logout
async function logoutUser() {
  const response = await fetch('http://localhost:7575/logout', {
    credentials: 'include',
  });
  const isSuccess = response.status === 204 || response.status === 304;
  return { isSuccess };
}

export { getAccessToken, loginUser, registerUser, logoutUser };

// TODO: convert fetch to axios
