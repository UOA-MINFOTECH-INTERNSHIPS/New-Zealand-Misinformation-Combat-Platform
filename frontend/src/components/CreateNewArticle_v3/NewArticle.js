
import React,{useState} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import { Checkbox } from '@mui/material';
import './NewArticle.css';
/*
    author: String,
    title: String,
    description:String,
    url:String,
    image:String,
    publish:Date,
    content:String,
    like: Boolean
*/ 


function Editor() {
  const [author,setAuthor] = useState('');
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [url,setUrl] = useState('');
  const [image,setImage] = useState('');
  const [publish,setPublish] = useState('');
  const [content,setContent] = useState('');
  const [like,setLike] = useState('');







  async function submitArticle(e) {
    e.preventDefault();

    try {
      const createText = {
        author,
        title,
        description,
        url,
        image,
        publish,
        content,
        like,
        content
      };

      await axios.post(
        "http://localhost:3001/api/..",
        createText
      );

    }catch (err) {
          console.error(err);
    }

  }




  return (

    <div className='container' >
    <form  onSubmit={submitArticle}  >
       
        <div>
                <label>Author</label>
                <input 
                type="text" 
                onChange={(e) => setAuthor(e.target.value)} 
                value={author}  
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
                <label>Description</label>
                <input 
                type="text" 
                onChange={(e) => setDescription(e.target.value)} 
                value={description}  
                />
        </div>
        <div>
                <label>URL</label>
                <input 
                type="text" 
                onChange={(e) => setUrl(e.target.value)} 
                value={url}  
                />
        </div>
        <div>
                <label>Image</label>
                <input 
                type="text" 
                onChange={(e) => setImage(e.target.value)} 
                value={image}  
                />
        </div>
        <div>
                <label>Publish</label>
                <input 
                className='data'
                type="Date" 
                onChange={(e) => setPublish(e.target.value)} 
                value={publish}  
                />
        </div>
        <div className="editor">

            <CKEditor
               editor={ClassicEditor}
               data={content}
               onReady={ editor => {
                         console.log( 'Editor is ready to use!', editor );
                       } }
               onChange={(event, editor) =>{
                                const data = editor.getData()
                                  setContent(data)
                         }}
            />
       </div>
        <div>
                <label>Like</label>
                <Checkbox
                type="Date" 
                onChange={(e) => setLike(e.target.value)} 
                value={like}  
                />
        </div>
        <button type="submit" className='sub_button'>
                  Submit
              </button>
   
    </form>
    </div>
  );
}

export default Editor;
