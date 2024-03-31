import { useEffect  } from "react"
import { useOutletContext } from "react-router-dom"
import ProfileLayout from "../../../components/shared/profile/ProfileLayout";

export const Profile = () => {

    const { setPagename, setCurrent } = useOutletContext();
    useEffect(() => {
        // set page name
        setPagename("My Profile")

        // indicate that this is the current page
        setCurrent(true)

    }, [setPagename, setCurrent])
    return (
        <div className="bg-white p-10 w-full flex items-center mt-4 rounded-md shadow-md justify-center">
            <ProfileLayout />
        </div>
    )
}

