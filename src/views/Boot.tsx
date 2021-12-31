import { Icon } from '@iconify/react'
import React from 'react'
export const Boot = () => {
    return (
        <div className="w-screen h-screen bg-gray-900 flex flex-col gap-10 justify-center items-center">
            <Icon className="text-[7em] text-white" icon="ant-design:apple-filled" />

            <Icon className='text-white text-2xl animate-spin' icon="ei:spinner" />

            <div className='w-40 h-[5px] rounded-lg relative bg-white/50'>

                <div className='bg-white/90 w-1/2 h-full absolute inset-0'></div>
            </div>
        </div>
    )
}