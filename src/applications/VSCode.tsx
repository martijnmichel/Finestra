
import React, { useState } from 'react'
import { Application } from '../store/atoms/applications'
import Icon from '../icons/vscode.png'
import { useWindowManager } from '../services/WindowManager';

export class VSCode extends Application {
    public name = 'VSCode';
    component = () => VSCodeApp()
    static icon = () => (<img src={Icon} alt="Logo" />)
    width = 1024
    height = 768
}

export const VSCodeApp = () => {


    return (
        <iframe src="https://vscode.dev/github/microsoft/vscode" width="100%" height="100%" className='rounded-b-lg' />
    )
}


export const navigation = (id: string) => [
    {
        label: 'File',
        items: [
            {
                label: 'New File',
                function: () => {
                    const {startApp} = useWindowManager()
                    startApp('Text Editor')
                }
            },
            {
                label: 'New Window',
                function: () => {
                    const {startApp} = useWindowManager()
                    startApp('Text Editor')
                }
            },
            {
                label: 'separator'
            },
            {
                label: 'Close',
                function: () => {
                    const {closeApp} = useWindowManager()
                    closeApp(id)
                }
            }
        ]
    },
    {
      label: 'Window',
      items: [
          {
              label: 'New File',
              function: () => {
                  const {startApp} = useWindowManager()
                  startApp('Text Editor')
              }
          },
          {
              label: 'New Window',
              function: () => {
                  const {startApp} = useWindowManager()
                  startApp('Text Editor')
              }
          },
          {
              label: 'separator'
          },
          {
              label: 'Close',
              function: () => {
                  const {closeApp} = useWindowManager()
                  closeApp(id)
              }
          }
      ]
  }
]