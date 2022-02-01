import Button from '@mui/material/Button';
import React,{useState} from 'react';
import {useParams,useNavigate} from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';
import axios from "axios";
import './NewMission.css';
import { Link } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
//import Cookies from 'universal-cookie';


function Editor() {
  const [url,setUrl] = useState('');
  const [title,setTitle] = useState('');
  const [author,setAuthor] = useState('');
  const [image,setImage] = useState('');
  const [backgroundInfo,setBackgroundInfo] = useState('');
  const [question,setQuestion] = useState('');
  const [keywords, setKeywords] = useState('');
  const Navigate = useNavigate();
  const [error, setError] = useState(null);
  //const [status, setStatus] = useState('');
  //const [support, setSupport] = useState('');
 

  const handleChange = (event) => {
        setKeywords(event.target.value);
  };

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("files", file);
            // axios.post("localhost:3001/api/image/upload", file)
            // axios.get("localhost:3001/api/image/get/12121773.jpg")
          });
        });
      }
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  async function submitArticle(e) {
    e.preventDefault();
    try {
      const cookie = new Cookies();
      const username = cookie.get('username');
      const createText = {
        username,
        url,
        title,
        author,
        image,
        backgroundInfo,
        question,
        keywords,
        
        };
      // console.log(createText)

      await axios.post(
       "http://localhost:3001/api/mission/post",
        createText,
       // Navigate("/MissionDisplay")

      )
      .then(()=>{
              alert("It works");
      })
    }catch (err) {
      setError(err.response.data.errorMessage);
    }
  }

  return (
    <div className='background'>
    <div className='inputContainer' >
    <form  onSubmit={submitArticle}  >
        <div >
                <label>URL</label>
                <input 
                type="text" 
                onChange={(e) => setUrl(e.target.value)} 
                value={url}  
                required
                />
        </div>
        <div>
                <label>Title</label>
                <input 
                type="text" 
                onChange={(e) => setTitle(e.target.value)} 
                value={title}  
                required
                />
        </div>
        <div>
                <label>Author</label>
                <input 
                type="text" 
                onChange={(e) => setAuthor(e.target.value)} 
                value={author}  
                required
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
               config={{
                extraPlugins: [uploadPlugin]
               }}
               editor={ClassicEditor}
               data={backgroundInfo}
               onBlur={(event, editor) => {}}
               onFocus={(event, editor) => {}}
               onReady={ editor => {
                         console.log( 'Editor is ready to use!', editor );
                       } }
               onChange={(event, editor) =>{
                const regex = /(<([^>]+)>)/ig
                const content = editor.getData().replace(regex, '')
                setBackgroundInfo(content)
                         }}
                         required
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
                console.log(content);
                  
                  setQuestion(content)
                         }}
                       
                  rules={{ required: "Question Field is required" }}
                        
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
        <label>Keyword</label>
         {/*< MultipleSelectChip   />*/}  
         <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
           <InputLabel id="demo-simple-select-label">CAT</InputLabel>
           <Select
             labelId="demo-simple-select-label"
             id="demo-simple-select"
             value={keywords}
             onChange={handleChange}
             required
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
                <div >
                  <Button className='sub_button' onClick={() => Navigate(-1)}> Go Back </Button>
               </div>
                
   
    </form>
    </div>
    </div>
  );
}

export default Editor;
