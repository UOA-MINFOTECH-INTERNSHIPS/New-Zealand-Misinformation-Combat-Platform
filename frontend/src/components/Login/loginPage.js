import React, { useState } from 'react';
<<<<<<< HEAD
import './login.css';
import axios from 'axios';

function Login(props) {
  const [username,setUsername] = useState('');
  const [password, setPassword] = useState('');
=======
import Navbar from '../Navigation/Navbar';
import './login.css'
import { useHistory } from "react-router-dom";
// import { AutoFixOffSharp } from '@mui/icons-material';
import axios from "axios";

function Login(props) {
>>>>>>> main

  // const username = useFormInput('');
  // const password = useFormInput('');
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // handle button click of login form
<<<<<<< HEAD
  async function handleLogin (e) {
    e.preventDefault();
    try{
      const user = {username,password}
      console.log(user);
      
      await axios.post("http://localhost:3001/api/user/login", user);
      console.log("logged in");
    }catch (err){

    }
    
=======
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
>>>>>>> main
  }


}


  return (
    <div>
      <div className='loginContainer'>
            <h1 className='loginHeading'>Login</h1>
            <div>
              <label>Username</label>
<<<<<<< HEAD
              <input type="text" autoComplete="new-password" onChange={(e) => setUsername(e.target.value)} 
                value={username}  />
            </div>
            <div style={{ marginTop: 10 }}>
              Password<br />
              <input type="password"  autoComplete="new-password" onChange={(e) => setPassword(e.target.value)} 
                value={password}  />
            </div>
           
            <button type="submit" className="registerbtn" onClick={handleLogin}>
=======
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
>>>>>>> main
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


<<<<<<< HEAD
=======
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


>>>>>>> main
export default Login;