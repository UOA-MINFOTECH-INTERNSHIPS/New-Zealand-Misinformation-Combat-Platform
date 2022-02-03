import React , {useState}from 'react';
import './results.css';
import { Cookies } from 'react-cookie';
import {Link} from 'react-router-dom';
import VerifiedIcon from '@mui/icons-material/Verified';


export default function Mission({data}) {
    const cookies = new Cookies();
    const userType = cookies.get('userType');

    return (
        <div className='missioncard'>
            { data.map((val, key)=> (
                <div className='card'>
                    <div >
                        <p><VerifiedIcon className='red'/>Verification result place holder</p>
                        <h3>{val.title}</h3>
                        <p> Fact checking on: {val.url} </p>
                        <p>Created on: {val.createdAt}</p>
                    </div>

                    <div className='missionbtn'>
                        <button>Like</button>
                        <button> <Link to= {`/result/${val._id}/read`}>Read more</Link></button>
                    </div>
                </div>
            ) ) } 
        </div>
    )
}
