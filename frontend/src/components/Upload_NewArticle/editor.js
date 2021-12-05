
import React,{useState} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


function Editor() {
  const [text,setText] = useState('')
  return (
    <div>
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
         }}
        />
      </div>
      <div>
        <h3>New article:</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Editor;
