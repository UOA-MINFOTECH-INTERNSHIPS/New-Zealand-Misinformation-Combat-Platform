import React, { useState } from 'react';
import './login.css'
// import { AutoFixOffSharp } from '@mui/icons-material';
import axios from "axios";

function Login(props) {
  const [username,setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // handle button click of login form
  async function handleLogin (e) {
    e.preventDefault();
    try{
      const user = {username,password}
      
      await axios.post("http://localhost:3001/api/user/login", user);
    }catch (err){
      setError(error.response.data.errorMessage);

    }
    
  }

  return (
    <div>
      <div className='loginContainer'>
            <h1 className='loginHeading'>Login</h1>
            <div>
              <label>Username</label>
              <input type="text" autoComplete="new-password" onChange={(e) => setUsername(e.target.value)} 
                value={username}  />
            </div>
            <div style={{ marginTop: 10 }}>
              Password<br />
              <input type="password"  autoComplete="new-password" onChange={(e) => setPassword(e.target.value)} 
                value={password}  />
            </div>
            
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br /> 
           
            <button type="submit" className="registerbtn" onClick={handleLogin}>
                    Login
            </button>
            <div className="SignInRedicted">
              <p>Do not have an account? <a href="/register">Register</a></p>
            </div>
          </div>
    </div>
  );
}


export default Login;