import React,{useState, useEffect} from 'react';
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link ,useParams} from 'react-router-dom';
import './ArticleDisplay.css';
import { ConstructionRounded } from '@mui/icons-material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';



function EditArticle() {
  const [url,setUrl] = useState('');
  const [title,setTitle] = useState('');
  const [author,setAuthor] = useState('');
  const [image,setImage] = useState('');
  const [backgroundInfo,setBackgroundInfo] = useState('');
  const [question,setQuestion] = useState('');
  const [keyword, setKeyword] = useState('');
  const [listOfArticle, setListOfArticle] = useState([]);
  const  id  = useParams();

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };
    
    useEffect(()=>{
       console.log(id);
       const missionid={"id":id};
       axios.post("http://localhost:3001/api/articles/find",missionid)
       .then((response) =>{
       setListOfArticle(response.data);
       //  const update = prompt("Enter val: ");
       
        console.log(response);
        setUrl(response.data.url);
        setTitle(response.data.title);
        setAuthor(response.data.author);
        
        
    })
    .catch(()=> {
        console.log("ERR")
    }) 
    // setAuthor();
    // setTitle("history from database");
    // setDescription("");
    // setUrl("");
    // setUrlToImage("");
    // setPublishAt("");
    // setContent("");
    

  },[]);

  
    async function submitArticle(e) {
      e.preventDefault();
  
      try {
        var dbid = id.id;
        const createText = {
          dbid,
          url,
          title,
          author,
          image,
          backgroundInfo,
          question,
          keyword
        };
       console.log(createText)
  
        await axios.put(
         "http://localhost:3001/api/articles/update",
          createText
        )
        .then(()=>{
                alert("It works");
        }
  
        )
  
      }catch (err) {
            console.error(err);
      }
  
    }
  
  
  
    return (
  
      <div className='container' >
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
       
         {/*  <div>
                  <label>Background Information</label>
                  <input 
                  type="text" 
                  onChange={(e) => setDescription(e.target.value)} 
                  value={description}  
                  />
          </div>
       <div>
                  <label>Publish</label>
                  <input 
                  className='data'
                  type="Date" 
                  onChange={(e) => setPublishAt(e.target.value)} 
                  value={publishAt}  
                  />
        </div> */}
          <div >
          <label>Background Information</label>
              <CKEditor
                 editor={ClassicEditor}
                 data={backgroundInfo}
                 onReady={ editor => {
                           console.log( 'Editor is ready to use!', editor );
                         } }
                 onChange={(event, editor) =>{
                                  const content = editor.getData()
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
                    const content = editor.getData()
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
               value={keyword}
               onChange={handleChange}
             >
               <MenuItem value={"Health"}>Health</MenuItem>
               <MenuItem value={"Economic"}>Economic</MenuItem>
               <MenuItem value={"Environment"}>Environment</MenuItem>
              
             </Select>
            </FormControl>
           </Box>
                  <button type="submit" className='sub_button'>
                    Submit
                  </button> 
                  
     
      </form>
      </div>
    );
  }
  
  export default EditArticle;
  