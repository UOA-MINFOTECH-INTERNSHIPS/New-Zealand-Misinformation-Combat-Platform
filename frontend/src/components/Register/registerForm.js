
import React, { useState } from "react";
import './registerForm.css'
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function Register() {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function register(e) {
    e.preventDefault();

    
    try {
      const registerData = {
        username,
        name,
        email,
        password,
        confirmPassword,
      };
      
      await axios.post(
        "http://localhost:3001/api/user/register",
        registerData
      );

      alert("Signed up Success");
      navigate('/login');


    }catch (error) {
      console.error(error.response.data.errorMessage);
      setError(error.response.data.errorMessage);
      // navigate('/login');
    }

  }
  return (
    <div>
        <div className='registerContainer'>
            <h2 className ='registerHeading'>Register</h2>
            <p>Please enter your detail to create an account</p>
            <hr/>
            <div>
                <label>Username</label>
                <input 
                type="text" 
                onChange={(e) => setUsername(e.target.value)} 
                value={username}  
                />
            </div>
            <div>
                <label>Name</label>
                <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                />
            </div>
            <div>
                <label>Email</label>
                <input 
                type="text" 
                value={email}  
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div style={{ marginTop: 10 }}>
                Password<br />
                <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                />
            </div>
            <div style={{ marginTop: 10 }}>
                ConfirmPassword<br />

                <input 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br /> 
            <form onSubmit={register}>
              <button type="submit" className="registerbtn">
                  Register
              </button>
            </form>
            <div className="SignInRedicted">

                <p>Already have an account? <a href="/login">Sign in</a></p>
            </div>
        </div>
    </div>
  );
}

// const useFormInput = initialValue => {
//   const [value, setValue] = useState(initialValue);
 
//   const handleChange = e => {
//     setValue(e.target.value);
//   }
//   return {
//     value,
//     onChange: handleChange
//   }
// }


export default Register;
  