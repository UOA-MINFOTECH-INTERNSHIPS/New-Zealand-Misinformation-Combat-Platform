import React, { useState } from "react";
import './registerForm.css'
//import axios from "axios";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';



export default function Register() {
  const [category, setCategory] = useState("category1");  
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  async function register(e) {
    e.preventDefault();

    try {
      const factCheckerData = {category, username, name, email, password, confirmPassword};
     // await axios.post("http://localhost:3001/api/user/register", factCheckerData);
      alert("registered");
      navigate('/login');
    }catch (err) {
        console.error(err);
        setError(error.response.data.errorMessage);
    }
  }
  return (
    <div>
        <div className='registerContainer'>
            <h2 className ='registerHeading'>Register</h2>
            <p>Please enter your detail to create an account</p>
            <hr/>
            <div className="selectionBox">
                <Box sx={{ minWidth: 120}}>
                    <FormControl fullWidth>
                        <label className="category-label">Category</label>
                        <Select labelId="category-select-label" id="category-select" value={category} label="Age" onChange={(e) => setCategory(e.target.value)} >
                            <MenuItem value={"category1"}>category1</MenuItem>
                            <MenuItem value={"category2"}>category2</MenuItem>
                            <MenuItem value={"category3"}>category3</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </div>

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


