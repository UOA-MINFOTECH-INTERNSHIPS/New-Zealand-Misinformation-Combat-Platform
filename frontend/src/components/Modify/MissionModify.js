import React,{useState, useEffect} from 'react';
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import {useParams,useNavigate} from 'react-router-dom';
import './NewMission.css';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';


function EditMission() {
  const [url,setUrl] = useState('');
  const [title,setTitle] = useState('');
  const [author,setAuthor] = useState('');
  const [image,setImage] = useState('');
  const [backgroundInfo,setBackgroundInfo] = useState('');
  const [question,setQuestion] = useState('');
  const [keywords, setKeywords] = useState('');
  const [listOfMission, setListOfMission] = useState([]);
  const [error, setError] = useState(null);
  const  findid  = useParams();
  //const navigate = useNavigate();
  const Navigate = useNavigate();

  const handleChange = (event) => {
    setKeywords(event.target.value);
  };
    
    useEffect(()=>{
       
      // const missionid={"findid":findid};
      const missionid={"id":findid._id};
       axios.post("http://localhost:3001/api/mission/find",missionid)
       .then((response) =>{
        setListOfMission(response.data);
       //  const update = prompt("Enter val: ");
        console.log(findid);
      //  console.log(response);
        setUrl(response.data.url);
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setImage(response.data.image);
        setBackgroundInfo(response.data.backgroundInfo);
        setQuestion(response.data.question);
    })
    .catch(()=> {
        console.log("ERR")
    }) 
  
  },[]);

    async function submitArticle(e) {
      e.preventDefault();
      try {
        var id=findid._id;
        const createText = {
          id,
          url,
          title,
          author,
          image,
          backgroundInfo,
          question,
          keywords
        };
      
       console.log(createText)
  
        await axios.put(
         "http://localhost:3001/api/mission/update",
          createText, { withCredentials: true },
          
        )
        .then(()=>{
          Navigate("/MyMissions")
             })
      }catch (err) {
        setError(err.response.data.errorMessage);
      }
  
    }
    return (
      <div className='background' >
       <div className='inputContainer' >
        <form  onSubmit={submitArticle}  >
          <div>
                  <label>URL</label>
                  <input 
                  type="text" 
                  onChange={(e) => setUrl(e.target.value)} 
                  value={url}  
                  />
          </div>
          <div>
                  <label>Title</label>
                  <input 
                  type="text" 
                  onChange={(e) => setTitle(e.target.value)} 
                  value={title}  
                  />
          </div>
          <div>
                  <label>Author</label>
                  <input 
                  type="text" 
                  onChange={(e) => setAuthor(e.target.value)} 
                  value={author}  
                  />
          </div>
          <div>
                  <label>URL of Image</label>
                  <input 
                  type="text" 
                  onChange={(e) => setImage(e.target.value)} 
                  value={image}  
                  />
          </div>
          <div >
          <label>Background Information</label>
              <CKEditor
                 editor={ClassicEditor}
                 data={backgroundInfo}
                 onReady={ editor => {
                           console.log( 'Editor is ready to use!', editor );
                         } }
                 onChange={(event, editor) =>{
                  const regex = /(<([^>]+)>)/ig
                  const content = editor.getData().replace(regex, '')
                  setBackgroundInfo(content)
                           }}
              />
         </div>
         <div>
          <label>Question</label>
              <CKEditor
                 editor={ClassicEditor}
                 data={question}
                 onReady={ editor => {
                    console.log( 'Editor is ready to use!', editor );
                         } }
                 onChange={(event, editor) =>{
                  const regex = /(<([^>]+)>)/ig
                  const content = editor.getData().replace(regex, '')
                  setQuestion(content)
                           }}
              />
         </div>
         {/*  <div>
                  <label>Like</label>
                  <input
                  type="checkbox" 
                  onChange={(e) => setLike(e.target.value)} 
                  value={like}  
                  />
          </div> */}
          <label>keyword</label>
           {/*< MultipleSelectChip   />*/}  
           <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
             <InputLabel id="demo-simple-select-label">CAT</InputLabel>
             <Select
               labelId="demo-simple-select-label"
               id="demo-simple-select"
               value={keywords}
               onChange={handleChange}
             >
               <MenuItem value={"Health"}>Health</MenuItem>
               <MenuItem value={"Economic"}>Economic</MenuItem>
               <MenuItem value={"Environment"}>Environment</MenuItem>
              
             </Select>
            </FormControl>
           </Box>
           {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br /> 
                  <button type="submit" className='sub_button'>
                    Submit
                  </button> 
                  <Button type="submit" className='sub_button' onClick={() => Navigate(-1)}>
                    Go back
                  </Button> 
         </form>
        </div>
      </div>
    );
  }
  
  export default EditMission;
  