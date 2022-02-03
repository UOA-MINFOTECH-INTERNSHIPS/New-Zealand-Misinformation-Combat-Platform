import React,{useState, useEffect} from 'react';
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { Link ,useParams} from 'react-router-dom';
import './ArticleDisplay.css';
import { ConstructionRounded } from '@mui/icons-material';


function EditArticle() {
    const  id  = useParams();
    const [author,setAuthor] = useState('');
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [url,setUrl] = useState('');
    const [urlToImage,setUrlToImage] = useState('');
    const [publishAt,setPublishAt] = useState('');
    const [content,setContent] = useState('');
    const [listOfArticle, setListOfArticle]=useState([]);


    useEffect(()=>{
       console.log(id);

       axios.post("http://localhost:3001/api/articles/find?id="+id.id)
       .then((response) =>{
       setListOfArticle(response.data);
       //  const update = prompt("Enter val: ");
       
        console.log(response);

        setAuthor(response.data.author);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setUrl(response.data.url);
        setUrlToImage(response.data.urlToImage);
        setPublishAt(response.data.publishAt);
        setContent(response.data.content);
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
        var bdid = id.id;
        const createText = {
          bdid,
          author,
          title,
          description,
          url,
          urlToImage,
          publishAt,
          content,
          content
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
                  <label>UrlToImage</label>
                  <input 
                  type="text" 
                  onChange={(e) => setUrlToImage(e.target.value)} 
                  value={urlToImage}  
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
          </div>
          <div className="editor">
  
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
          
          {/* <Link to="/ArticleDisplay"> */}
                  <button type="submit" className='sub_button'>
                    Submit
                  </button> 
           {/* </Link> */}
     
      </form>
      </div>
    );
  }
  
  export default EditArticle;
  