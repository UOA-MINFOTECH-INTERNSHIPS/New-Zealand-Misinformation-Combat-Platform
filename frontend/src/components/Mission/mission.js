import React from 'react';
import './mission.css';


export default function Mission({data}) {
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
                        <button><a href= {`/request`}>Like</a></button>
                        <button> <a href= {`/result/${val._id}`}>Read more</a></button>
                    </div>
                </div>
            ) ) } 
        </div>
    )
}
