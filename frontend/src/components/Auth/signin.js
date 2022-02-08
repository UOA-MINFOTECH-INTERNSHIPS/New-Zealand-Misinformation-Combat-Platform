import React, { useState, useContext } from 'react';
import './auth.css'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import AppContext from '../../AppContextProvider';



function Login() {
  const {loggedIn, getLoggedIn,  user, setUser} = useContext(AppContext);
  const [username,setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const Navigate = useNavigate();
  async function handleLogin (e) {
    e.preventDefault();

    try{
      const user_temp = {username,password}
      const response = await axios.post("http://localhost:3001/api/user/login", user_temp);
      if(response.status === 200) {
        const userDetail = response.data;
        console.log(userDetail)

        const cookies= new Cookies();
        cookies.set('username',userDetail.username, {path: '/'});
        cookies.set('email',userDetail.email, {path: '/'});
        cookies.set('userType',userDetail.userType, {path: '/'});
        setUser(userDetail);
        getLoggedIn();
        Navigate('/')
      }else{
        setError(response.data.errorMessage);
      }

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