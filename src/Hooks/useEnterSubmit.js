import { useEffect } from 'react'

const useEnterSubmit = (onSubmit) => {
    useEffect(() => {
        const listener = event => {
            if (event.code === 'Enter' || event.code === 'NumpadEnter') {
                onSubmit()
            }
        }
        document.addEventListener('keydown', listener)
        return () => {
            document.removeEventListener('keydown', listener)
        }
    }, [onSubmit])
}

export default useEnterSubmit