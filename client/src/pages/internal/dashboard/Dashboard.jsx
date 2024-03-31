import { useEffect, useState  } from "react"
import { useOutletContext } from "react-router-dom"
import { Bargraph } from "../../../components/shared/dashboard/Bargraph";
import axios from 'axios'
import FaceRoundedIcon from '@mui/icons-material/FaceRounded';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import VerifiedIcon from '@mui/icons-material/Verified';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Button } from "@material-tailwind/react";
import { ProgressBar } from "../../../components/shared/dashboard/ProgressBar";


export const Dashboard = () => {

    const { setPagename, setCurrent } = useOutletContext();
    const [ role, setRole ] = useState("");

    useEffect(() => {
        // set page name
        setPagename("Dashboard")

        // indicate that this is the current page
        setCurrent(true)

        const data = []
        // fetch role
        axios.get("http://127.0.0.1:8000/auth/users/me/",{
            headers: {
                'Authorization': "Token " + localStorage.getItem("token")
            }
        })
        .then((response) => {
            setRole(response.data.role)
            localStorage.setItem("role", response.data.role)
            localStorage.setItem("lrn", response.data.lrn)
            localStorage.setItem("id", response.data.id)
            
         

        })
        .catch((err) => {
            console.log(err)
        } )

        
    }, [])

        

    return (
        <>
        { role && role == "admin" ? 
        <>
        <div className="w-full min-h-44 grid grid-cols-1 md:grid-cols-3 gap-9 mb-5 animate-fade">
            <div className="bg-white rounded shadow h-44 w-full p-3 border-s-blue-700 border-s-8">
                
                <p className="uppercase font-bold text-blue-gray-800 tracking-wider text-xl p-3">Current Students</p>
                <div className="flex gap-5 w-2/3 p-3 mx-auto justify-evenly text-2xl items-center">
                    <FaceRoundedIcon color="primary" fontSize="large" style={{fontSize: '50px'}} /> | <p className="font-semibold text-blue-gray-800">23</p>
                </div> 

            </div>
            <div className="bg-white rounded shadow h-44 w-full p-3 border-s-green-700 border-s-8">

                <p className="uppercase font-bold text-blue-gray-800 tracking-wider text-xl p-3">Passed the Course</p>
                <div className="flex gap-5 w-2/3 p-3 mx-auto justify-evenly text-2xl items-center">
                    <VerifiedIcon color="success" fontSize="large" style={{fontSize: '50px'}} /> | <p className="font-semibold text-blue-gray-800">23</p>
                </div>
                
            </div>
            <div className="bg-white rounded shadow h-44 w-full p-3 border-s-teal-700 border-s-8">

                <p className="uppercase font-bold text-blue-gray-800 tracking-wider text-xl p-3">Current Batch</p>
                <div className="flex gap-5 w-2/3 p-3 mx-auto justify-evenly text-2xl items-center">
                    <Diversity3Icon fontSize="large" style={{fontSize: '50px', color: "teal"}} /> | <p className="font-semibold text-blue-gray-800">2024</p>
                </div>

            </div>
        </div>

        <h3 className="p-4 uppercase font-black text-xl text-blue-gray-700 tracking-wide">Analytics</h3>
        <Bargraph graphColor={"dodgerblue"} graphPhrase={"Visualize data on mastery level 1 competencies"} graphTitle={"Matery Level 1: Competency Chart"} iconColor={"bg-blue-700"}/>
        <Bargraph graphColor={"#2AB7A2"} graphPhrase={"Visualize data on mastery level 2 competencies"} graphTitle={"Matery Level 2: Competency Chart"} iconColor={"bg-teal-300"}/>
        <Bargraph graphColor={"#121212"} graphPhrase={"Visualize data on mastery level 3 competencies"} graphTitle={"Matery Level 3: Competency Chart"} iconColor={"bg-blue-gray-900"}/>
         </>: 
         
         role && role == "student" ? 
         
         <>
         <div className="w-full min-h-44 grid grid-cols-1 md:grid-cols-3 gap-9 mb-5">
            <div className="bg-white rounded shadow h-44 w-full p-3 border-s-indigo-700 border-s-8">
                
                <p className="uppercase font-bold text-blue-gray-800 tracking-wider text-xl p-3">Current Mastery Level</p>
                <div className="flex gap-5 w-2/3 p-3 mx-auto justify-evenly text-2xl items-center">
                    <DirectionsRunIcon className="text-indigo-900" fontSize="large" style={{fontSize: '50px'}} /> | <p className="font-semibold text-blue-gray-800">Lvl 1</p>
                </div>

            </div>
            <div className="bg-white rounded shadow h-44 w-full p-3 border-s-green-700 border-s-8">

                <p className="uppercase font-bold text-blue-gray-800 tracking-wider text-xl p-3">Current Competency Level</p>
                <div className="flex gap-5 w-2/3 p-3 mx-auto justify-evenly text-2xl items-center">
                    <SignalCellularAltIcon color="success" fontSize="large" style={{fontSize: '50px'}} /> | <p className="font-semibold text-blue-gray-800">3</p>
                </div>
                
            </div>
            <div className="bg-white rounded shadow h-44 w-full p-3 border-s-teal-700 border-s-8">

                <p className="uppercase font-bold text-blue-gray-800 tracking-wider text-xl p-3">Pre-Test Score</p>
                <div className="flex gap-5 w-2/3 p-3 mx-auto justify-evenly text-2xl items-center">
                    <EditNoteIcon fontSize="large" style={{fontSize: '50px', color: "teal"}} /> | <p className="font-semibold text-blue-gray-800">30 / 30</p>
                </div>

            </div>
        </div>

        <h3 className="p-4 uppercase font-black text-xl text-blue-gray-700 tracking-wide">Progress</h3>
        
        <div className="shadow rounded-md bg-white min-h-24 p-8 mb-6">
            <ProgressBar statusText={"Ongoing"} progressValue={"30"} percentage={"30"}/>
        </div>
        <h3 className="p-4 uppercase font-black text-xl text-blue-gray-700 tracking-wide">Quick Links</h3>
        
        <div className="shadow rounded-md bg-white min-h-24 p-8">
            <div className="grid md:grid-cols-4 gap-5">
                <Button variant="gradient" color="teal" className="rounded-full" disabled fullWidth>Current Module</Button>
                <Button variant="gradient" className="rounded-full" disabled fullWidth>Chats</Button>
                <Button variant="gradient" color="deep-purple" className="rounded-full" disabled fullWidth>Feedbacks</Button>
                <Button variant="gradient" color="blue" className="rounded-full" disabled fullWidth>Pre Test</Button>
            </div>
        </div>
         </> : null}

         </>
    )
}

