import React ,{ useState, useEffect }from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import './results.css';
import Results from './results';


export default function ResultsContainer() {
    const [listOfResult, setListofResults] = useState([]);
    const [filteredResult, setFilteredArticle] = useState ([]);
    const [page, setPage] = useState(1);

    useEffect(()=> {
        const pageNum ={page};
        axios.post("http://localhost:3001/api/result/resultlist", pageNum)
       .then((response) =>{
            setListofResults(response.data.results);
        })
       .catch(()=> {console.log("ERR") } )
   }, []);

   const handleSearch = (e) => {
        const searchWord = e.target.value;
        const newFilter = listOfResult.filter((value) => {
            return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });
        setFilteredArticle(newFilter);
   }
    return (
        <div className='missions'>
            <div className='mission'>
            <p className='title'> Fact checked results </p>
            
            <div className='missionSearch'>
                <input type='text' placeholder= "Search here ..." onChange={handleSearch} /> 
            </div>

            <div className='missionRadioBtn'>
                <RadioGroup row aria-label="sort" name="row-radio-buttons-group">
                    <FormControlLabel value="popular" control={<Radio />} label="Sort by popularity" />
                    <FormControlLabel value="time" control={<Radio />} label="Sort by time" />
                </RadioGroup>
            </div>

            { filteredResult.length != 0 ? (<Results data={filteredResult}/>) :(<Results data={listOfResult}/>)}
            
            </div>
        </div>
    )
}
