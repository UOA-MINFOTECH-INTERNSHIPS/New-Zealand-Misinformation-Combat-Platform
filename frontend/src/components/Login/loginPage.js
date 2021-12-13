import React, { useState } from 'react';
import Navbar from '../Navigation/Navbar';
import './login.css'
import { useHistory } from "react-router-dom";
// import { AutoFixOffSharp } from '@mui/icons-material';
import axios from "axios";

function Login(props) {

  // const username = useFormInput('');
  // const password = useFormInput('');
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // handle button click of login form
  // const handleLogin = () => {
  //   const user = {
  //     username: username,
  //     password: password
  //   }
  //   console.log(user);
  // }

  async function login(e){
    e.preventDefault();

    try {
      const loginData = {
        username,
        password,
      };

      await axios.post(
        "http://localhost:3001/api/user/login",
        loginData
      );

      
  }catch(err){
    console.error(err);
  }


}


  return (
    <div>
      <div className='loginContainer'>
            <h1 className='loginHeading'>Login</h1>
            <div>
              <label>Username</label>
              <input type="text" 
              onChange={(e) => setUsername(e.target.value)} 
              value={username} 
              autoComplete="new-password" />
            </div>
            <div style={{ marginTop: 10 }}>
              Password<br />
              <input type="password" 
              onChange={(e) => setPassword(e.target.value)} 
              value={password} 
              autoComplete="new-password" />
            </div>
            {/* {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br /> */}
            <form onSubmit={login}>
              <button type="submit" className="registerbtn">
                    Login
              </button>
            </form>
            <div className="SignInRedicted">
              <p>Do not have an account? <a href="/register">Register</a></p>
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


export default Login;