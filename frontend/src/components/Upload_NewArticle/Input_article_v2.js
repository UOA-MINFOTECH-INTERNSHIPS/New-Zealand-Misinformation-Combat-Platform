
import React,{useState} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";



function Editor() {
  const [text,setText] = useState('');

  async function submitArticle(e) {
    e.preventDefault();

    try {
      const createText = {
        text
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
    <form  onSubmit={submitArticle}>
      <div className="editor">
        <CKEditor
         editor={ClassicEditor}
         data={text}
         onReady={ editor => {
          console.log( 'Editor is ready to use!', editor );
      } }
         onChange={(event, editor) =>{
           const data = editor.getData()
           setText(data)

           ///console.log(data)
         }}
        />
      </div>
      <div>
        <h3>New article:</h3>
        <p>{text}</p>
      </div>
    </form>
  );
}

export default Editor;
