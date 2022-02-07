import React, { useState } from "react";
import './auth.css'
import axios from "axios";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import InputLabel from "@mui/material/InputLabel";

export default function Register() {
  const [category, setCategory] = useState("");  
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function register(e) {
    e.preventDefault();

    try {
      const factCheckerData = {username, name, email, password, confirmPassword, userType, category};
      console.log(factCheckerData)
      const res = await axios.post("http://localhost:3001/api/user/register", factCheckerData);
      console.log(res.status);
      if (res.status == 201){
        navigate('/signin');
      }else{
        setError(res.data.errorMessage);
      }

    }catch (err) {
        setError(err.response.data.errorMessage);
    }
  }

  return (
    <div className="auth">
        <div className='authContainer'>
            <h2 className ='authHeading'>Register</h2>
            <p className="regLabel">Please enter your detail to create an account</p>
            <hr/>

            <div className="selectionBox">
                <Box sx={{ minWidth: 120}}>
                    <FormControl fullWidth>
                        <InputLabel className="category-label" id="demo-multiple-name-label">Select Your Account Type</InputLabel>
                        <Select labelId="category-select-label" id="category-select" value={userType} label="Category" onChange={(e) => setUserType(e.target.value)} >
                            <MenuItem value={"Normal user"}>Normal user</MenuItem>
                            <MenuItem value={"Fact checker"}>Fact checker</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </div>

            {userType == 'Fact checker' && (
                <div className="selectionBox">
                    <Box sx={{ minWidth: 120}}>
                        <FormControl fullWidth>
                            <InputLabel className="category-label" id="demo-multiple-name-label">Select Your Interest</InputLabel>
                            <Select labelId="category-select-label" id="category-select" value={category} label="Category" onChange={(e) => setCategory(e.target.value)} >
                                <MenuItem value={"category1"}>category1</MenuItem>
                                <MenuItem value={"category2"}>category2</MenuItem>
                                <MenuItem value={"category3"}>category3</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
            )}

            <div>
                <label>Username</label>
                <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} />
            </div>

            <div>
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div>
                <label>Email</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div style={{ marginTop: 10 }}>
                Password <br />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div style={{ marginTop: 10 }}>
              ConfirmPassword<br />
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            </div>

            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br /> 

            <form onSubmit={register}>
              <button type="submit" className="btn">
                  Register
              </button>
            </form>

            <div className="redirect">
                <p>Already have an account? <a href="/login">Sign in</a></p>
            </div>
        </div>
    </div>
  );
}


