import React, { useState } from 'react';
import './registerForm.css'

function Register(props) {
  const username = useFormInput('');
  const password = useFormInput('');
  const name = useFormInput('');
  const email = useFormInput('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
 
  // handle button click of login form
  const handleLogin = () => {
    const user = {
      username: username,
      name: name,
      email: email,
      password: password
    }
    console.log(user);
  }

  return (
    <div>
        <div className='loginContainer'>
            <h2 className ='registerHeading'>Register</h2>
            <p>Please enter your detail to create an account</p>
            <hr/>
            <div>
                <label>Username</label>
                <input type="text" {...username}  required/>
            </div>
            <div>
                <label>Name</label>
                <input type="text" {...name}  required/>
            </div>
            <div>
                <label>Email</label>
                <input type="text" {...email}  required/>
            </div>
            <div style={{ marginTop: 10 }}>
                Password<br />
                <input type="password" {...password} required/>
            </div>
            <div style={{ marginTop: 10 }}>
                ConfirmPassword<br />
                <input type="password" {...password} required/>
            </div>
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br /> 
            
            <button type="submit" className="registerbtn" onClick={handleLogin}>
                Register
            </button>

            <div class="SignInRedicted">
                <p>Already have an account? <a href="/login">Sign in</a></p>
            </div>
        </div>
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}


export default Register;
  