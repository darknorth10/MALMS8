import { useEffect, useState  } from "react"
import { useOutletContext } from "react-router-dom"
import ClassIllustration from "../../../assets/img/class_invite.svg"
import Button from "@mui/material/Button"
import Loading from "../../../components/shared/Loading"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

export const Classes = () => {

    // for calling the loading component
    const [loadingOpen, setLoadingOpen] = useState(false)

    // for redirection
    const redirect = useNavigate()


    // handle the loading pop up 
    const handleLoading = () => {
        setLoadingOpen(!loadingOpen)
    }


    // check if the uer has joined a class

    const [hasClass, setHasClass] = useState(false)
    const userID = localStorage.getItem('id')
    const role = localStorage.getItem('role')


    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${userID}/`, {
            headers: {
                Authorization: "Token " + localStorage.getItem('token')
            }
        }).then((response) => {
            if (response.data.class_id != null) {
                setHasClass(true)
            }


        }).catch((err) => {
            console.log(err)
        })


    }, [])


    const { setPagename, setCurrent } = useOutletContext();
    useEffect(() => {
        // set page name
        setPagename("Classes")

        // indicate that this is the current page
        setCurrent(true)

    }, [setPagename, setCurrent])

    
    return (
        <div className=" w-full flex items-center justify-center">
            {hasClass && hasClass == true  ?  <>
                <h5>This account has already joined a class</h5>
                
            </> :
            <div className="h-[60vh] w-full flex items-center justify-center">
                <div className="p-10 flex-auto h-1/2 flex flex-col justify-center items-center gap-7">
                    <img src={ClassIllustration} alt="Class Invite" className="h-60" />
                    <p className="text-xl text-center text-blue-gray-600">You are not currently a member of a class. <br /> To join a class you will be needing an invitation code from the teacher.</p>

                    <Button variant="contained" size="large" className="w-full md:w-auto" onClick={handleLoading}>Join Now</Button>
                </div>
                
                <Loading loadingOpen={loadingOpen}/>
            </div>
            
            
            }

            
        </div>
    )
}

