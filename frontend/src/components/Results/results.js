import React from 'react'
import Button from '@mui/material/Button';
import './results.css';


export default function Results({data}) {
    return (
        <div className='content'>
        {data.map((result)=> (
            <div className='contentItem'>
                <div>
                    <p >Verification result</p>
                    <p ><a  href= {'/verified/' + result._id} >{result.title}</a></p>
                    <div className='description'> <p>{result.description}</p> </div>
                </div>

                <div className='actionbtn'>
                    <Button size="small">Like</Button>
                </div>
            </div>
        ) ) } 
    </div>
    )
}
