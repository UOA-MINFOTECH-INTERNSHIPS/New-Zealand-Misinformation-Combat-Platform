
import React,{useState} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import axios from "axios";
import './NewArticle.css';
import { Link } from 'react-router-dom';
/*
    author: String,
    title: String,
    description:String,
    url:String,
    urlToImage:String,
    publishAt:Date,
    content:String,
    like: Boolean

*/ 


function Editor() {
  const [author,setAuthor] = useState('');
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [url,setUrl] = useState('');
  const [urlToImage,setUrlToImage] = useState('');
  const [publishAt,setPublishAt] = useState('');
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
        urlToImage,
        publishAt,
        content,
        like
      };
       console.log(createText)

      await axios.post(
       "http://localhost:3001/api/articles/post",
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
                <label>URL</label>
                <input 
                type="text" 
                onChange={(e) => setUrl(e.target.value)} 
                value={url}  
                />
        </div>
        <div>
                <label>UrlToImage</label>
                <input 
                type="text" 
                onChange={(e) => setUrlToImage(e.target.value)} 
                value={urlToImage}  
                />
        </div>
     
      <div>
                <label>Question Description</label>
                <input 
                type="text" 
                onChange={(e) => setDescription(e.target.value)} 
                value={description}  
                />
        </div>
     {/*   <div>
                <label>Publish</label>
                <input 
                className='data'
                type="Date" 
                onChange={(e) => setPublishAt(e.target.value)} 
                value={publishAt}  
                />
      </div> */}
        <div className="editor">
        <label>Background Information</label>
            <CKEditor
               editor={ClassicEditor}
               data={content}
               onReady={ editor => {
                         console.log( 'Editor is ready to use!', editor );
                       } }
               onChange={(event, editor) =>{
                                const content = editor.getData()
                                  setContent(content)
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
        
                <button type="submit" className='sub_button'>
                  Submit
                </button> 
         
   
    </form>
    </div>
  );
}

export default Editor;
