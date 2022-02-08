import React,{useState, useEffect} from 'react';
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { useParams,useNavigate} from 'react-router-dom';
import './NewMission.css';
/*import { ConstructionRounded } from '@mui/icons-material'; */
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';



function EditResults() {
 
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
      const resultid={"id":findid._id};
       axios.post("http://localhost:3001/api/result/find",resultid)
       .then((response) =>{
        setListOfResult(response.data);
       //  const update = prompt("Enter val: ");
        console.log(response.data);
      //  console.log(response);
        setAnalysis(response.data.analysis);
        setConclusion(response.data.conclusion);
       // setVerdict(response.data.verdict);
        setReference(response.data.reference);
        
        
    })
    .catch(()=> {
        console.log("ERR")
    }) 
  },[]);

  
    async function submitResult(e) {
      e.preventDefault();
  
      try {
        var id=findid._id;
        const createText = {
          id,
          analysis,
          conclusion,
          verdict,
          reference
          
        };
       console.log(createText)
  
        await axios.put(
         "http://localhost:3001/api/result/update",
          createText, { withCredentials: true },
         // Navigate("/profile")
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
    );
  }
  
  export default EditResults;
  