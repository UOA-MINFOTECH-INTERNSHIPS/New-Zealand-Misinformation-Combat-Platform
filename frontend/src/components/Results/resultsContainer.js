import React ,{ useState, useEffect }from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import './results.css';
import Results from './results';
import Pagination from "@mui/material/Pagination";
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(() => ({
    ul: {
      "& .MuiPaginationItem-root": {
        color: 'rgb(233, 183, 91)',
        padding: "20px 20px",
        backgroundColor: '#1A2634'
      }
    },
    container:{
        justifyContent:"center",
        alignItems:"center",
        marginTop: "50px",
        width:"100%"
    },
  }));


export default function ResultsContainer() {
    const [listOfResult, setListofResults] = useState([]);
    const [filteredResult, setFilteredArticle] = useState ([]);
    const [page, setPage] = useState(1);
    const classes = useStyles();
    const [totalPage, setTotalPage] = useState(1); 

    axios.post("http://localhost:3001/api/result/resultNum").then((res)=> {
        setTotalPage(Math.ceil(res.data/20));
    })



    useEffect(()=> {
        const pageNum ={page};
        axios.post("http://localhost:3001/api/result/resultlist", pageNum)
       .then((response) =>{
            setListofResults(response.data.results);
            setTotalPage((listOfResult/20).ceil());
        })
       .catch(()=> {console.log("ERR") } )
   }, []);

   const handleChange = (event, value) => {
    setPage(value);
};

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

            {
                <div className={classes.container}>
                    <Pagination className="page" defaultPage={1} count={totalPage} page={page} onChange={handleChange} color="primary" variant="contained" classes={{ ul: classes.ul }}/>
                </div>
            }
            
            </div>
        </div>
    )
}
