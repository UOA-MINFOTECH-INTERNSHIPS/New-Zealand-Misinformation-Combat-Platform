import {NavLink} from 'react-router-dom';
import './navStyle.css';
import Profile from './ProfileDropdown';

export default function Navbar (){

    return(
    <div className='NavContainer'>
        <nav>
            <div className ='logo'>
                <p>ARTI</p>
            </div>
            <div>
                <ul>
                    <li><NavLink  to = '/articles' activeclassname='is-active' >Articles</NavLink></li>
                    <li><NavLink to = '/recommendation' activeclassname='is-active'>Recommendation</NavLink></li>
                </ul>
            
            </div>
            
            <Profile/>

        </nav>

    </div>
    )
}
