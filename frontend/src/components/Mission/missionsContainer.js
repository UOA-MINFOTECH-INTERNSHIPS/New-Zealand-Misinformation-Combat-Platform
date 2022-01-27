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
    const [page, setPage] = useState(2);
    const navigate = useNavigate();

    useEffect(()=> {
        const pageNum ={page};
        axios.post("http://localhost:3001/api/mission/missionlist", pageNum)
       .then((response) =>{
            setMissionList(response.data.results);
        })
       .catch(()=> {console.log("ERR") } )
   }, []);

   const handleSearch = (e) => {
    const searchWord = e.target.value;
    const newFilter = missionList.filter((value) => {
        return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });
    setFilteredResult(newFilter);
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
            <div className='category'>
                <ul>
                    <li><a class="active" href="verified/all">All</a></li>
                    <li> <a  href="verified/health" >Health</a></li>
                    <li><a  href="verified/economic" >Economic</a></li>
                    <li><a  href="verified/environment" >Environment</a></li>
                    <li><a href="verified/technology" >Technology</a></li>
                    <li><a href="verified/lifestyle"  >Life Style</a></li>
                    <li><a href="verified/international" >International</a></li>
                </ul>
            </div>

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

                { filteredResult.length != 0 ? (<Mission data={filteredResult}/>) :(<Mission data={missionList}/>)}
                
                </div>
            </div>
            

        </div>
    )
}
