
import React,{useState} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Button from '../Button/Button';
import Input from './Input';
//import { renderMatches } from 'react-router';
//import 'bootstrap/dist/css/bootstrap.main.css'
import './input.css';



const Editor = props => { 
   
 

          const [title,setTitle] = useState('')
       //   const [text,setText] = useState('')

          const titleChangeHandler = event => {
            setTitle(event.target.value);
          };

        //  const textChangeHandler = (event, editor) =>{
        //    const data = editor.getData()
        //    setText(data)
        //    console.log(data)
         //   }
          

          const submitArticleHandler = event => {
            event.preventDefault();
            props.onAddArticle(title);
          };
            return (
                <div className='container'>
                  <div >
                   <form  onChange={submitArticleHandler}>
                      <label>Title</label>
                      <Input 
                        type="text" 
                        label="title"
                        id="title"
                        value={title}
                        onChange={titleChangeHandler}   
                        placeholder="Type an title  for your article " 
                        />

                       
                        <Button className='sub_button' type="submit"> Add </Button>
                     </form>
                    </div>

                    <hr/>

                     <div>
                    <h3>New article:</h3>
                 
                  </div>
                </div>
              );
              
          }
        
 
    


export default Editor;
