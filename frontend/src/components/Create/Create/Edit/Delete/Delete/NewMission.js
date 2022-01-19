
import React,{useState} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import './NewMission.css';
import { Link } from 'react-router-dom';
import * as react from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';


function Editor() {
  const [url,setUrl] = useState('');
  const [title,setTitle] = useState('');
  const [author,setAuthor] = useState('');
  const [image,setImage] = useState('');
  const [backgroundInfo,setBackgroundInfo] = useState('');
  const [question,setQuestion] = useState('');
  const [keywords, setKeywords] = useState('');
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
            // axios.post("localhost:3000/api/image/upload", file)
            // axios.get("localhost:3000/api/image/get/12121773.jpg")
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
      const createText = {
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
        createText
      )
      .then(()=>{
              alert("It works");
      })
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

export default Editor;
