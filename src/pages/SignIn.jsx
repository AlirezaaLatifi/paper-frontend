import { useState } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import FormInput from '../components/FormInput';
import { useAuthSetState, useAuthState } from '../contexts/auth';
import { SIGNININPUTS } from '../consts/inputs';
import { loginUser } from '../APIs/user';

function SignIn() {
  const navigate = useNavigate();
  const updateAuth = useAuthSetState();
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    remember: false,
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormInputChanges = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    if (!formValues.username || !formValues.password) {
      setErrorMessage('username and password are required.');
    } else {
      loginUser(formValues).then((res) => {
        if (res.isSuccess) {
          updateAuth({
            token: res.accessToken,
            loading: false,
            username: jwtDecode(res.accessToken).username,
          });
          navigate('/');
        } else {
          setErrorMessage(res.message);
        }
      });
    }
  };

  return (
    <div className="container mx-auto flex h-screen">
      <div className="grid w-full place-items-center bg-teal-900 ">
        <h1 className="text-5xl text-white">Sign In</h1>
      </div>
      <div className="w-full self-center p-5">
        <form className="grid gap-5">
          {SIGNININPUTS.map((input) => (
            <FormInput
              key={input.id}
              name={input.name}
              type={input.type}
              label={input.label}
              placeholder={input.placeholder}
              required={input.required}
              errorMessage={input.errorMessage}
              pattern={input.pattern ? input.pattern : null}
              onChange={handleFormInputChanges}
              value={formValues[input.name]}
            />
          ))}

          <div className="flex items-center gap-2">
            <label htmlFor="remember">remember me</label>
            <input
              id="remember"
              type="checkbox"
              checked={formValues.remember}
              onChange={() =>
                setFormValues({
                  ...formValues,
                  remember: !formValues.remember,
                })
              }
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-teal-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-teal-700 focus:outline-none  dark:bg-teal-600 dark:hover:bg-teal-700 sm:w-auto"
            onClick={handleLogIn}
          >
            Sign in
          </button>
          {errorMessage && (
            <p className="text-red-500 text-center uppercase">{errorMessage}</p>
          )}
          <p className="pt-2 border-t">
            Didn&apos;t registered yet?{' '}
            <Link className="text-blue-700 " to="/register">
              -{'>'} Sign up Now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

function Wrapper() {
  const auth = useAuthState();
  if (auth?.token) redirect('/');
  return <SignIn />;
}

export default Wrapper;
