import axios from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import React, {useState, useEffect, useContext } from 'react';
import Mission from './mission'
import {useNavigate } from 'react-router-dom';
import AppContext from '../../AppContextProvider';
import './mission.css'

export default function Missions() {
    const {loggedIn} = useContext(AppContext);
    const [missionList, setMissionList] = useState([]);
    const [filteredResult, setFilteredResult] = useState ([]);
    const [totalPage, setTotalPage] = useState(1); 
    const navigate = useNavigate();

    useEffect(()=> {
        axios.get("http://localhost:3001/api/mission/missionNum").then((res)=> {
            setTotalPage(Math.ceil(res.data/20));
        })

        axios.get("http://localhost:3001/api/mission/all").then((res)=> {
            setMissionList(res.data);
            
        }).catch(()=> {console.log("ERR") } )
   }, []);
   

    const handleSearch = (e) => {
        const searchWord = e.target.value;
        const newFilter = missionList.filter((value) => {
            return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });
        setFilteredResult(newFilter);
        if(newFilter.length == 0) {
            setTotalPage(1);
        }else setTotalPage(Math.ceil(newFilter.length/20));
    }

    const handleRequest = () => {
        if (loggedIn) {
            navigate('/NewMission')
        }else {
            alert('You are not logged in')
            navigate('/signin')
        }
    }

    return (
        <div className='missionContainer'>

            <div className='missions'>
                <div className='mission'>
                <p className='title'> Missions 
                <button className='requestBtn' onClick={handleRequest}> I want to request </button>

                </p>
                <div className='missionSearch'>
                    <input type='text' placeholder= "Search here ..." onChange={handleSearch} /> 
                </div>

                <div className='missionRadioBtn'>
                    <RadioGroup row aria-label="sort" name="row-radio-buttons-group">
                        <FormControlLabel value="popular" control={<Radio />} label="Sort by popularity" />
                        <FormControlLabel value="time" control={<Radio />} label="Sort by time" />
                    </RadioGroup>
                </div>

                { filteredResult.length != 0 ? (<Mission data={filteredResult} totalPage={totalPage}/>) :(<Mission data={missionList} totalPage={totalPage}/>)}
                
                </div>
            </div>
            

        </div>
    )
}
