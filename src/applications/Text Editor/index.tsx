
import React, { useState } from 'react'
import { Application } from '../../store/atoms/applications'
import Icon from '../../icons/text-editor.png'
import { navigation } from './navigation';

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
        <textarea className='w-full h-full' value={text} onChange={val => setText(val.target.value)}></textarea>
    )
}
