
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
        <iframe src="https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3" className="rounded-b-lg" width="100%" height="100%" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    )
}