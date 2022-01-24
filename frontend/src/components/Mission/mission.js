import React, {useContext} from 'react';
import './mission.css';
import { Cookies } from 'react-cookie';
import {Link} from 'react-router-dom'


export default function Mission({data}) {
    const cookies = new Cookies();
    const userType = cookies.get('userType');

    console.log(userType)

    return (
        <div className='missioncard'>
            { data.map((val)=> (
                <div className='card'>
                    <div >
                        <h3>{val.title}</h3>
                        <p> Fact checking on: {val.url} </p>
                        <p>Created on: {val.createdAt}</p>
                    </div>

                    <div className='missionbtn'>
                        <button><Link to= {`/mission`}>Vote</Link></button>
                        <button> <Link to= {`/mission/${val._id}/read`}>Read more</Link></button>
                        {userType == 'fact checker' && (<button> <Link to= {`/MissionCheck/${val._id}`}>Verify</Link></button>)}

                    </div>
                </div>
            ) ) } 
        </div>
    )
}
