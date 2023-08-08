import { useState } from 'react';
import isEmail from 'validator/lib/isEmail';

function App() {
  
  const [signupInput, setSignupInput] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { value, name } = e.target;
    setSignupInput({ ...signupInput, [name]: value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if(!isEmail(signupInput.email)) {
      setError('The email is invalid');
    } else if(signupInput.password.length < 5) {
      setError('The password you entered should contain 5 or more characters');
    } else if(signupInput.password !== signupInput.confirmPassword) {
      setError("The password doesn't match. Try again");
    }
  }
  
  return (
    <div className='container my-5'>
      <from>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input
            className='form-control'
            type='email'
            id='email'
            name='email'
            value={signupInput.email}
            onChange={handleChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            className='form-control'
            type='password'
            id='password'
            name='password'
            value={signupInput.password}
            onChange={handleChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='confirmPassword' className='form-label'>
            Confirm password
          </label>
          <input
            className='form-control'
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            value={signupInput.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {!!error && <p className='text-danger'>{error}</p>}
        <button type='submit' className='btn btn-primary' onClick={handleClick}>Submit</button>
      </from>
    </div>
  );
}

export default App;
