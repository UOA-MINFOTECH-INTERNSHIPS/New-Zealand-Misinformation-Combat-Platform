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
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import { Cookies } from 'react-cookie';


function EditArticle() {
 
  const [analysis,setAnalysis] = useState('');
  const [conclusion,setConclusion] = useState('');
  const [verdict, setVerdict] = useState('');
  const [reference, setReference] = useState('');
  const [listOfResult, setListOfResult] = useState([]);
  const [error, setError] = useState(null);
  const Navigate = useNavigate();
  const  findid  = useParams();

  const handleChange = (event) => {
    setVerdict(event.target.value);
  };
    useEffect(()=>{
      // const missionid={"findid":findid};
      const id={"id":findid._id};
       axios.post("http://localhost:3001/api/mission/find",id)
       .then((response) =>{
        setListOfResult(response.data);
       //  const update = prompt("Enter val: ");
        console.log(findid);
        console.log(response);        
    })
    .catch(()=> {
        console.log("ERR")
    }) 
  },[]);

    async function submitResult(e) {
      e.preventDefault();
  
      try {
        var missionID=findid._id;
        const cookies = new Cookies();
        const username=cookies.get('username');
        const verdict ='True';
        const createText = {
          username,
          missionID,
          analysis,
          conclusion,
          verdict,
          reference
          
        };
      // console.log(createText)
  
        await axios.post(
         "http://localhost:3001/api/result/post",
           createText,{ withCredentials: true }
        )
        .then(()=>{
                alert("It works");
        })
      }catch (err) {
        setError(err.response.data.errorMessage);
      }
    }
  
    return (
  
      <div className='container' >
       <form  onSubmit={submitResult}  >
          <div >
           <LiveHelpIcon style={{width:"60px", height:"60px", margin:"5px"}} />
          </div>
          <div>
          <label>Title:</label>
          <div>{listOfResult.title}</div>
          </div>
          <div>
          <label>Question:</label>
          <div dangerouslySetInnerHTML={{__html: listOfResult.question}}></div>
          </div>
          <div>
          <label>Background Information:</label>
          <div dangerouslySetInnerHTML={{__html: listOfResult.backgroundInfo}}></div>
          </div>
          <br/>
          <div >
          <label>Analysis</label>
              <CKEditor
                 editor={ClassicEditor}
                 data={analysis}
                 onReady={ editor => {
                           console.log( 'Editor is ready to use!', editor );
                         } }
                 onChange={(event, editor) =>{
                                  const content = editor.getData()
                                  setAnalysis(content)
                           }}
              />
         </div>
         <div>
          <label>Conclusion</label>
              <CKEditor
                 editor={ClassicEditor}
                 data={conclusion}
                 onReady={ editor => {
                    console.log( 'Editor is ready to use!', editor );
                         } }
                 onChange={(event, editor) =>{
                    const content = editor.getData()
                    setConclusion(content)
                           }}
              />
         </div>
         <div>
                  <label>Reference</label>
                  <input 
                  type="text" 
                  onChange={(e) => setReference(e.target.value)} 
                  value={reference}  
                  />
          </div>
         
          <label>Verdict</label>
           {/*< MultipleSelectChip   />*/}  
           <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
             <InputLabel id="demo-simple-select-label">CAT</InputLabel>
             <Select
               labelId="demo-simple-select-label"
               id="demo-simple-select"
               value={verdict}
               onChange={handleChange}
             >
               <MenuItem value={"True"}>True</MenuItem>
               <MenuItem value={"Partly True"}>Partly True</MenuItem>
               <MenuItem value={"False"}>False</MenuItem>
              
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
    );
  }
  
  export default EditArticle;
  