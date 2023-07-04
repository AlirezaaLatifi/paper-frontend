import jwtDecode from 'jwt-decode';
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getAccessToken } from '../APIs/user';
import API from '../APIs';

export type Auth = {
  token: string;
  loading: boolean;
  username: string;
};

export type AuthPayload = {
  username: string;
};

// * creating context
const AuthContext = createContext<Auth>({
  token: '',
  loading: true,
  username: '',
});
const AuthContextSetState = createContext<Dispatch<SetStateAction<Auth>>>(
  () => {}
);

// * custom context provider
function AuthProvider({ children }: PropsWithChildren) {
  const [auth, setAuth] = useState<Auth>({
    token: '',
    loading: true,
    username: '',
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
          username: jwtDecode<AuthPayload>(accessToken).username,
        };
        setAuth(authRef.current);
      })
      .catch(() => {
        setAuth({
          token: '',
          loading: false,
          username: '',
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
            console.error('Error 500: ', error);
            message = 'Something went wrong, Try again Later';
          }

          if (error.response.status === 403) {
            console.error('Error 403: ', error);
            message = error.message;
            return getAccessToken().then((accessToken) => {
              authRef.current = {
                token: accessToken,
                loading: false,
                username: jwtDecode<AuthPayload>(accessToken).username,
              };
              setAuth(authRef.current);

              return API({
                ...error.config,
                Authorization: `bearer ${authRef.current?.token}`,
              });
            });
          }
        }
        // request was made, but no response was received
        else if (error.request) {
          console.error('NO RESPONSE: ', error);
          message = error.message;
        }
        // Something happened in setting up the request that triggered an Error
        else {
          console.error('NO REQUEST: ', error);
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

  const updateAuth = (newAuth: Auth) => {
    setAuth(newAuth);
  };

  return updateAuth;
}

export { AuthProvider, useAuthState, useAuthSetState };
