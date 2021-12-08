import React, { useState,useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import './registerForm.css'
import axios from 'axios';
import { UserContext } from "../../UserContextProvider";

function Register(props) {
  const {username, password, name, email, confirmPassword} = useFormInput('');
  const { user, createUser, isLoading } = useContext(UserContext);

  const [error, setError] = useState(null);
  //const [loading, setLoading] = useState(false);

  //history but in v6 we only can use useNavigate
  const navigate = useNavigate();

  const handleSubmit = () => {
    const user = {
      username: username,
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    }
    console.log(user);
    navigate('/login');
    

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
                <input type="password" {...confirmPassword} required/>
            </div>
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br /> 
            
            <button type="submit" className="registerbtn" onClick={handleSubmit}>
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
  