
import React, { useEffect, useRef, useState } from 'react'
import { Application } from '../../store/atoms/applications'
import Icon from '../../icons/text-editor.png'
import { navigation } from './navigation';

import { Editor } from '@tinymce/tinymce-react';

export class TextEditor extends Application {
    public name = 'Text Editor';

    static icon = () => <img src={Icon} alt="Logo" />
    
    component = () => TextEditorApp()

    navigation = () => navigation(this.id)
    

    constructor() {
        super()
    }
}

export const TextEditorApp = () => {

    const [text, setText] = useState('');


    return (
        <Editor
         initialValue="<p>Start typing a story...</p>"
            apiKey='r6ay9fo6y8tbazrg719vx6sbn40bjzlyi0agfpbo65evbpqn'
         init={{
           height: '100%',
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar: 'undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
         }}
       />
    )
}
