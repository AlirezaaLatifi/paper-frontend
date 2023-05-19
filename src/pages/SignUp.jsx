import { useState } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import { registerUser } from '../APIs/user';
import { useAuthState } from '../contexts/auth';

function SignUp() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  // ? I cant extract this input into consts folder, since its dynamic. what is the best practise?!
  const inputs = [
    {
      id: 1,
      name: 'username',
      type: 'text',
      label: 'Username',
      placeholder: 'yourname_123',
      required: true,
      errorMessage: '4-8 characters of letters, numbers and underscore',
      pattern: '^[a-zA-Z0-9_]{4,8}$',
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
    {
      id: 3,
      name: 'confirmPassword',
      type: 'password',
      label: 'Confirm Password',
      placeholder: '',
      required: true,
      errorMessage: "passwords don't match",
      pattern: formValues.password,
    },
  ];

  const handleFormInputChanges = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    registerUser(formValues).then((isRegistered) => {
      if (isRegistered) {
        navigate('/');
      } else {
        setErrorMessage('username already exists.');
      }
    });
  };

  return (
    <div className="container mx-auto flex flex-col h-screen md:flex-row ">
      <div className="grid w-full place-items-center bg-teal-900 h-20 md:h-auto">
        <h1 className="text-5xl text-white">Sign Up</h1>
      </div>
      <div className="w-full self-center p-5">
        <form className="grid gap-5">
          {inputs.map((input) => {
            return (
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
            );
          })}
          <button
            type="submit"
            className=" rounded-lg bg-teal-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-teal-700  focus:outline-none dark:bg-teal-600 dark:hover:bg-teal-700"
            onClick={handleSignUp}
          >
            Sign up
          </button>
          {errorMessage && (
            <p className="text-red-500 text-center uppercase">{errorMessage}</p>
          )}
          <p className="pt-2 border-t">
            Already registered?{' '}
            <Link className="text-blue-700 whitespace-nowrap" to="/login">
              -{'>'} Login Now
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
  return <SignUp />;
}

export default Wrapper;
