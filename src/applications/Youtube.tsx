
import React from 'react'
import { Application } from '../store/atoms/applications'
import Icon from '../icons/youtube.png'

export class Youtube extends Application {
    public name = 'Youtube';
    static icon = () => (<img src={Icon} alt="Logo" />)

    
    component = () => YoutubeApp()
    

    constructor() {
        super()
    }
}

export const YoutubeApp = () => {


    return (
        <iframe width="100%" height="100%" className="rounded-b-lg" src="https://youtube.com" />
    )
}