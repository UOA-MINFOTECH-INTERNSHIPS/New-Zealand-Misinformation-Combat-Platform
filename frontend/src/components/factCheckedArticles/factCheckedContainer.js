import Articles from './verifiedArticles';
import Category from './Category';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './container.css';


export default function FactCheckedContainer() {
    const [listOfArticle, setListOfArticle] = useState([]);
    const [filteredArticle, setFilteredArticle] = useState ([]);

    useEffect(()=> {
        axios.get("http://localhost:3001/api/articles/all")
       .then((response) =>{
            setListOfArticle(response.data);
//            console.log(listOfArticle);
        })
       .catch(()=> {console.log("ERR") } )
   }, []);

   const handleSearch = (e) => {
        const searchWord = e.target.value;
        const newFilter = listOfArticle.filter((value) => {
            return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });
        setFilteredArticle(newFilter);
        console.log(filteredArticle)
   }

    return(
        <div>
            <Grid container spacing={2}>

                <Grid item xs={4}>
                    <Category />
                </Grid>
                
                <Grid item xs={6}>
                    <div className='content'>
                        <div className='search'>
                            <div className='searchInputs'> 
                                <input type='text' placeholder= "Search here ..." onChange={handleSearch} /> 
                            </div>
                        </div>
                        <div className='radioBtn'>
                            <RadioGroup row aria-label="sort" name="row-radio-buttons-group">
                                <FormControlLabel value="popular" control={<Radio />} label="Sort by popularity" />
                                <FormControlLabel value="time" control={<Radio />} label="Sort by time" />
                            </RadioGroup>
                        </div>
                        {
                            filteredArticle.length != 0 ? (
                                <Articles data={filteredArticle}/>
                            ) : 
                            (
                                <Articles data={listOfArticle}/>
                            )
                        }
                        
                    </div>

                </Grid>

            </Grid>
        </div>
    )

}