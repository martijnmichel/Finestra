
import React from 'react'
import { Application } from '../store/atoms/applications'
import Icon from '../icons/finder.png'

export class Finder extends Application {
    public name = 'Finder';
    static icon = () => (<img src={Icon} alt="Logo" />)

    
    component = () => FinderApp()
    

    constructor() {
        super()
    }
}

export const FinderApp = () => {


    return (
        <h1>Finder</h1>
    )
}