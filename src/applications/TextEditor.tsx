
import React, { useState } from 'react'
import { Application } from '../store/atoms/applications'
import Icon from '../icons/text-editor.png'

export class TextEditor extends Application {
    public name = 'Text Editor';

    static icon = () => <img src={Icon} alt="Logo" />
    
    component = () => TextEditorApp()
    

    constructor() {
        super()
    }
}

export const TextEditorApp = () => {

    const [text, setText] = useState('');

    return (
        <textarea className='w-full h-full' value={text} onChange={val => setText(val.target.value)}></textarea>
    )
}