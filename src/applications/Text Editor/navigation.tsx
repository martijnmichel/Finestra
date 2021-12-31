
import { useWindowManager } from '../../services/WindowManager'

export const navigation = (id: string) => [
    {
        label: 'File',
        items: [
            {
                label: 'New file',
                function: () => {
                    const {startApp} = useWindowManager()
                    startApp('Text Editor')
                }
            },
            {
                label: 'New window',
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
              label: 'New file',
              function: () => {
                  const {startApp} = useWindowManager()
                  startApp('Text Editor')
              }
          },
          {
              label: 'New window',
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