import React, {useState} from 'react';
import './registerForm.css';
import { useContext } from "react";
import createNewUser from "/Users/Felix Wang/Documents/GitHub/new/frontend/src/hooks/useUser";
import { AppContext } from "/Users/Felix Wang/Documents/GitHub/new/frontend/src/AppContextProvider";

export default function RegistrationForm(props) {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, createNewUser, deleteAllUser, isLoading } = useContext(AppContext);

    return(
        <div className="registerContainer">
            <form>
                <div>
                    <h2 className ='registerHeading'>Register</h2>
                    <p>Please enter your detail to create an account</p>
                    <hr/>

                    <label htmlFor="InputUsername">Username</label>
                    <input type="text" className="form-control" id="username" placeholder = 'Enter Username' required/>
                    <label htmlFor="InputName">Name</label>
                    <input type="text" className="form-control" id="name" placeholder = 'Enter Name' required/>
                    
                </div>
                
                <div className="form-group text-left">
                    <label htmlFor="InputEmail1">Email</label>
                    <input type="email" className="form-control" id="email" placeholder = 'Enter Email' required/>
                </div>

                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" required/>
                </div>

                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password"/>
                </div>

                <button type="submit" className="registerbtn" onClick={() => createNewUser()}>
                    Register
                </button>

                <div class="SignInRedicted">
                    <p>Already have an account? <a href="#">Sign in</a></p>
                </div>
            </form>
        </div>
    )
}

