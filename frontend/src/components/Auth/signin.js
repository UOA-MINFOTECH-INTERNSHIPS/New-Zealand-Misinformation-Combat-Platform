import React, { useState, useEffect, useContext } from 'react';
import './auth.css'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import AppContext from '../../AppContextProvider';



function Login() {
  const {user, setUser} = useContext(AppContext);
  const [username,setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const Navigate = useNavigate();

  async function handleLogin (e) {
    e.preventDefault();

    try{

      const user = {username,password}
      
      const userDetail = await axios.post("http://localhost:3001/api/user/login", user);
     // console.log(userDetail.data.username);
      const cookies= new Cookies();
      cookies.set('username',userDetail.data.username, {path: '/'});
      Navigate("/profile")
    
      const user_temp = {username,password}
      const res = await axios.post("http://localhost:3001/api/user/login", user_temp);
      setUser(res.data);
      Navigate("/home")

    }catch (err){
      setError(error.response.data.errorMessage);

    }
  }
  
  return (
    <div className="auth">
      <div className='authContainer'>
            <div >
            <h1 className='authHeading'>Login</h1>
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
           
            <button type="submit" className="btn" onClick={handleLogin}>
                    Login
            </button>
            <div className="redirect">
              <p>Do not have an account? <a href="/register">Register</a></p>
            </div>
            </div>
          </div>
    </div>
  );
}


export default Login;