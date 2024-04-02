import { useEffect  } from "react"
import { useOutletContext } from "react-router-dom"
import { Input, Button } from "@material-tailwind/react";


export const JoinClass = () => {

    const { setPagename, setCurrent } = useOutletContext();
    useEffect(() => {
        // set page name
        setPagename("Join Class")

        // indicate that this is the current page
        setCurrent(true)

    }, [setPagename, setCurrent])
    return (
        <div className="w-full h-[70vh] flex flex-col items-center justify-center rounded-lg p-8">
            
            <div className="w-full md:w-1/3 p-8 bg-white shadow-md rounded-md text-center">
            <h4 className="font-bold uppercase text-blue-gray-800 pb-8 text-2xl">Join Class</h4>
                <Input color="indigo" label="Enter Class Code" />
                <Button className="mt-5 text-center" fullWidth color="indigo" size="sm">Join</Button>
            </div>
        </div>
    )
}

