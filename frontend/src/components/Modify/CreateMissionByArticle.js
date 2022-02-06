import React,{useState, useEffect} from 'react';
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link ,useParams,useNavigate} from 'react-router-dom';
import './NewMission.css';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Cookies } from 'react-cookie';


function CreateMissionByArticle() {
 
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState('');
    const [backgroundInfo, setBackgroundInfo] = useState('');
    const [question, setQuestion] = useState('');
    const [keywords, setKeywords] = useState(''); 
    const [listOfResult, setListOfResult] = useState([]);
    const [error, setError] = useState(null);
    const Navigate = useNavigate();
    const  findid  = useParams();

  const handleChange = (event) => {
    setKeywords(event.target.value);
  };
    useEffect(()=>{
      const id={"id":findid._id};
       axios.post("http://localhost:3001/api/articles/find",id)
       .then((response) =>{
        setListOfResult(response.data);
       //  const update = prompt("Enter val: ");
        console.log(id);
        console.log(response);        
    })
    .catch(()=> {
        console.log("ERR")
        console.log(findid);
    }) 
  },[]);

  async function submitArticle(e) {
    e.preventDefault();
    try {
      const cookie = new Cookies();
      const username = cookie.get('username');
      const title =listOfResult.title;
      const author =listOfResult.author;
      const image =listOfResult.image;
      const backgroundInfo = listOfResult.description;
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
        
      )
        .then(() => {
          alert("It works");
          Navigate("/MyMissions")
        })
    } catch (err) {
      setError(err.response.data.errorMessage);
    }
  }

  return (
    <div className='background'>
      <div className='inputContainer' >
        <form onSubmit={submitArticle}  >
        <label>Title:</label>
          <div>{listOfResult.title}</div>
          <CardMedia component="img" alt="green iguana" height="200" image= {listOfResult.urlToImage}/>
            {listOfResult.author != null ?
                 <Typography variant="body2" color="text.secondary">
                    Author: {listOfResult.author}
                </Typography> : 
                <Typography variant="body2" color="text.secondary">
                    Author: Undefined
                </Typography> }

          <label>Description:</label>
          <div>{listOfResult.description}</div>
         {/*   <div >
              <br/>
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
          <div >
            <label>Background Information</label>
            <CKEditor
              config={{
                extraPlugins: [uploadPlugin]
              }} 
              editor={ClassicEditor}
              data={backgroundInfo}
              onBlur={(event, editor) => { }}
              onFocus={(event, editor) => { }}
              onReady={editor => {
                console.log('Editor is ready to use!', editor);
              }}
              onChange={(event, editor) => {
                const regex = /(<([^>]+)>)/ig 
                const content = editor.getData()
                setBackgroundInfo(content)
              }}
              required
            />
          </div>  */}
          <div>
            <label>Question</label>
            <CKEditor
              editor={ClassicEditor}
              data={question}
              onReady={editor => {
                console.log('Editor is ready to use!', editor);
              }}
              onChange={(event, editor) => {
                const content = editor.getData()
                console.log(content);

                setQuestion(content)
              }}

              rules={{ required: "Question Field is required" }}

            />
          </div>

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
                <MenuItem value={"Technology"}>Technology</MenuItem>
                <MenuItem value={"Life Style"}>Life Style</MenuItem>
                <MenuItem value={"International"}>International</MenuItem>



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
  
  export default CreateMissionByArticle;
  