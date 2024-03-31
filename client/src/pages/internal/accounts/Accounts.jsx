import { useEffect  } from "react"
import { useOutletContext } from "react-router-dom"
import DataGrid from "../../../components/shared/DataGrid";

export const Accounts = () => {

    const { setPagename, setCurrent } = useOutletContext();
    useEffect(() => {
        // set page name
        setPagename("Accounts Management")

        // indicate that this is the current page
        setCurrent(true)

    }, [setPagename, setCurrent])
    return (
        <div className="bg-blue-gray-50 w-full h-7/8 flex items-center justify-center">
            <DataGrid/>
        </div>
    )
}

