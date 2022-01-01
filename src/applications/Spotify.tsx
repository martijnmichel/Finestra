
import React from 'react'
import { Application } from '../store/atoms/applications'
import Icon from '../icons/spotify.png'

export class Spotify extends Application {
    public name = 'Spotify';
    static icon = () => (<img src={Icon} alt="Logo" />)

    
    component = () => SpotifyApp()
    

    constructor() {
        super()
    }
}

export const SpotifyApp = () => {


    return (
        <h1>Spotify</h1>
    )
}