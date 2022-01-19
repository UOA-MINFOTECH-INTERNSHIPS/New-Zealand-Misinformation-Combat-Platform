import React,{useState, useEffect} from 'react';
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link ,useParams} from 'react-router-dom';
import './NewMission.css';
import { ConstructionRounded } from '@mui/icons-material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';



function EditArticle() {
 
  const [analysis,setAnalysis] = useState('');
  const [conclusion,setConclusion] = useState('');
  const [verdict, setVerdict] = useState('');
  const [reference, setReference] = useState('');
  const [listOfResult, setListOfResult] = useState([]);
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
        const createText = {
          missionID,
          analysis,
          conclusion,
          verdict,
          reference
          
        };
      // console.log(createText)
  
        await axios.post(
         "http://localhost:3001/api/result/post",
          createText, { withCredentials: true }
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
      <form  onSubmit={submitResult}  >
          <div>
          <label>Title:</label>
          <label>{listOfResult.title}</label>
          </div>
          <div>
          <label>Question:</label>
          <label>{listOfResult.question}</label>
          </div>
          <div>
          <label>Background Information:</label>
          <label>{listOfResult.backgroundInfo}</label>
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
                  <button type="submit" className='sub_button'>
                    Submit
                  </button> 
                  
     
      </form>
      </div>
    );
  }
  
  export default EditArticle;
  