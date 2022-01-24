import React, {useState, useEffect, useContext} from 'react'
import './home.css'
import axios from 'axios';
import Button from '@mui/material/Button';
import bkImg from '../Image/bkimg.jpg'
import WhatshotIcon from '@mui/icons-material/Whatshot';

export default function Home() {
    const [newest, setNewest] = useState([]);
    const [mission, setMission] = useState([]);
    const [page, setPage] = useState(1);
    useEffect(()=> {
        
        const pageNum ={page};
        axios.post("http://localhost:3001/api/result/resultlist", pageNum)
       .then((response) =>{
        setNewest(response.data.results);
        })
       .catch(()=> {console.log("ERR") } )

        axios.post("http://localhost:3001/api/mission/missionlist", pageNum)
       .then((response) =>{
        setMission(response.data.results);
        })
       .catch(()=> {console.log("ERR") } )


   }, []);


    return (
        <div className='home'>
            <img className='bkimg' src={bkImg}/>

            <div className='container'>
                <div className='newest'>
                    <h1>What's new</h1><br/>
                    { newest.map((val)=> (
                        <div className='card'>
                            <div >
                                <p>
                                    {val.title}
                                    </p>

                                    <p> Fact checking article Number: 
                                    {val.url}
                                    </p>
                                    <p>{val.analysis}</p>
                                    <p>
                                Fact Checked by: {val.author}
                                </p>
                            </div>

                            <div >
                                <Button className='action' ><a href= {`/request`}>Vote</a></Button>
                                <Button className='action'> <a href= {`/result/${val._id}`}>Read more</a></Button>
                            </div>
                        </div>
                    ) ) } 
                    <Button className='btn' size="small"><a href= {`/result`}>View more</a></Button>

                </div>

                <div className='popular'>
                    <h1>Popular fact<WhatshotIcon sx={{color:'red', fontSize:'30px'}}/></h1> <br/> 
                    {
                        mission.map ((val) => (
                            <div className='popularItem'>{val.question}</div>
                        ))
                    }
                </div>

            </div>
        </div>
    )
}
