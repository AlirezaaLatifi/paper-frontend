import jwtDecode from 'jwt-decode';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { getAccessToken } from '../APIs/user';
import API from '../APIs';

// * creating context
const authContext = createContext(null);

// * custom context provider
function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    token: null,
    loading: true,
    username: null,
  });

  const authRef = useRef(auth);
  // ? if I remove below line, the APIs will call with last access token, so we get 403 error.
  authRef.current = auth;

  // to get access token with refresh token at first mount
  useEffect(() => {
    getAccessToken().then((res) => {
      if (res.isSuccess) {
        authRef.current = {
          token: res.accessToken,
          loading: false,
          username: jwtDecode(res.accessToken).username,
        };
        setAuth(authRef.current);
      } else {
        setAuth({
          token: null,
          loading: false,
          username: null,
        });
      }
    });
  }, []);

  useEffect(() => {
    API.interceptors.request.use(
      (config) => {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `bearer ${authRef.current.token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );
  }, [auth]);

  useEffect(() => {
    API.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response.status === 403) {
          getAccessToken().then((res) => {
            if (res.isSuccess) {
              setAuth({
                token: res.accessToken,
                loading: false,
                username: jwtDecode(res.accessToken).username,
              });
            }
          });
        }
        return Promise.reject(err.response.data.message);
      }
    );
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <authContext.Provider value={[auth, setAuth]}>
      {children}
    </authContext.Provider>
  );
}

// * custom hook for useContext
function useAuth() {
  const [auth, setAuth] = useContext(authContext);

  const updateAuth = (newAuth) => {
    setAuth(newAuth);
  };

  return { auth, updateAuth };
}

export { AuthProvider, useAuth };

// ? what is withAuth HOC that Robin mentioned in his context tutorial about?
