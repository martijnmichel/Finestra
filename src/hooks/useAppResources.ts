import { useState } from "react"
import { useTheme } from "./useTheme"

export const useAppResources = () => {

    const {init, theme} = useTheme()

    const [loaded, setLoaded] = useState(false)

    const loadResources = async () => {
        await init()

        console.log('App Loaded')
        

        setLoaded(true)
    }

    return {
        loaded,
        loadResources
    }
}