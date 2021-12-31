
import { backgrounds, backgrounds as wallpapers } from "../constants/background"

export const useTheme = () => {

    
   

    /**
     * Load the needed resources from localStorage
     */
    const init = async () => {
        await cacheImages()
    }

    const cacheImages = async () => {
        const promises = wallpapers.map(src => {
            return new Promise((resolve, reject) => {

                const img = new Image();

                img.src = src;
                img.onload = () => resolve(img);
                img.onerror = () => reject();

            })
        })

        await Promise.all(promises)
    }

    const background = () => backgrounds[2]

    return {
        init,
        background
    }
}