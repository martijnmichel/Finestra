
import React, { useState } from 'react'
import { Application } from '../store/atoms/applications'
import Icon from '../icons/safari.png'
import { AppActions } from '../components/application/AppActions';

export class Safari extends Application {
    public name = 'Safari';
    static icon = () => (<img src={Icon} alt="Logo" />)
    titleBar = true;
    
    component = () => SafariApp(this.id)
   
    

    constructor() {
        super()
    }
}



export const SafariApp = (id: string) => {

    const [address, setAddress] = useState('https://tocadovision.nl')


    return (
        <>
        <div className="px-1 py-2 flex items-center justify-between">
          <AppActions id={id} />

            <div className=''>
                <input className="bg-white border-neutral-10 rounded-sm px-1" value={address} onChange={val => setAddress(val.target.value)} />
            </div>
          
        </div>

        <iframe src={address} width="100%" height="100%" className="rounded-b-lg" />
        </>

    )
}