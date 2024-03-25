import { useEffect  } from "react"
import { useOutletContext } from "react-router-dom"


export const Classes = () => {

    const { setPagename, setCurrent } = useOutletContext();
    useEffect(() => {
        // set page name
        setPagename("Classes")

        // indicate that this is the current page
        setCurrent(true)

    }, [setPagename, setCurrent])
    return (
        <div className="bg-blue-gray-50 w-full h-7/8 flex items-center justify-center">
            
        </div>
    )
}

