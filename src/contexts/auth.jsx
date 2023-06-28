import jwtDecode from 'jwt-decode';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { getAccessToken } from '../APIs/user';
import API from '../APIs';

// * creating context
const AuthContext = createContext(null);
const AuthContextSetState = createContext(null);

// * custom context provider
function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    token: null,
    loading: true,
    username: null,
  });

  const authRef = useRef(auth);
  authRef.current = auth;

  // to get access token with refresh token at first mount
  useEffect(() => {
    getAccessToken()
      .then((accessToken) => {
        authRef.current = {
          token: accessToken,
          loading: false,
          username: jwtDecode(accessToken).username,
        };
        setAuth(authRef.current);
      })
      .catch((errorMessage) => {
        console.error(errorMessage);
        setAuth({
          token: null,
          loading: false,
          username: null,
        });
      });
  }, []);

  useEffect(() => {
    API.interceptors.request.use(
      (config) => {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `bearer ${authRef.current?.token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );
  }, [auth]);

  useEffect(() => {
    API.interceptors.response.use(
      (res) => res,
      (error) => {
        let message;
        // responded with status out of 2xx range.
        if (error.response) {
          if (error.response.status === 500) {
            console.error('Error: ', error.response.data.message);
            message = 'Something went wrong, Try again Later';
          }

          if (error.response.status === 403) {
            console.error('Error: ', error.message);
            message = error.message;
            return getAccessToken()
              .then((accessToken) => {
                authRef.current = {
                  token: accessToken,
                  loading: false,
                  username: jwtDecode(accessToken).username,
                };
                setAuth(authRef.current);

                return API({
                  ...error.config,
                  Authorization: `bearer ${authRef.current?.token}`,
                });
              })
              .catch((errorMessage) => {
                console.error(errorMessage);
              });
          }
        }
        // request was made, but no response was received
        else if (error.request) {
          console.error('Error: ', error.request);
          message = error.message;
        }
        // Something happened in setting up the request that triggered an Error
        else {
          console.error('Error: ', error.message);
          message = error.message;
        }

        return Promise.reject(message);
      }
    );
  }, []);

  return (
    <AuthContext.Provider value={auth}>
      <AuthContextSetState.Provider value={setAuth}>
        {children}
      </AuthContextSetState.Provider>
    </AuthContext.Provider>
  );
}

// * custom hooks for useContext

function useAuthState() {
  const auth = useContext(AuthContext);
  return auth;
}

function useAuthSetState() {
  const setAuth = useContext(AuthContextSetState);

  const updateAuth = (newAuth) => {
    setAuth(newAuth);
  };

  return updateAuth;
}

export { AuthProvider, useAuthState, useAuthSetState };
