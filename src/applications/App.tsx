
import React, { useState } from 'react'
import { Application } from '../store/atoms/applications'
import Icon from '../icons/launchpad.png'

export class DefaultApp extends Application {
    public name = 'Default App';
    component = () => DefaultAppApp()
    static icon = () => (<img src={Icon} alt="Logo" />)
}

export const DefaultAppApp = () => {


    return (
        <h1>Default App</h1>
    )
}