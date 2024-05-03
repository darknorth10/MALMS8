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
import img1 from "../../../assets/img/class_invite.svg"

export const Dashboard = () => {

    const { setPagename, setCurrent } = useOutletContext();
    const [ role, setRole ] = useState("");
    const [masterylvl, setMasteryLvl] = useState(0)
    const [competency, setCompetency] = useState(0)
    const [progress, setProgress] = useState(0)
    const [status, setStatus] = useState("Ongoing")
    const [pretest, setPretest] = useState(0)
    const [passed, setPassed] = useState(0)
    const [currentUsers, setCurrentUsers] = useState(0)
    const token = localStorage.getItem("token")

    useEffect(() => {
        // set page name
        setPagename("Dashboard")

        // indicate that this is the current page
        setCurrent(true)

        const data = []
        // fetch role
        axios.get("http://127.0.0.1:8000/auth/users/me/",{
            headers: {
                'Authorization': "Token " + token
            }
        })
        .then((response) => {

            setRole(response.data.role)
            
            localStorage.setItem("role", response.data.role)
            localStorage.setItem("firstname", response.data.first_name)
            localStorage.setItem("lastname", response.data.last_name)
            localStorage.setItem("lrn", response.data.lrn)
            localStorage.setItem("id", response.data.id)
            localStorage.setItem("email", response.data.email)
            localStorage.setItem("pretest", response.data.pretest)
            localStorage.setItem("mastery", response.data.mastery)
            
         
        })
        .catch((err) => {
            console.log(err)
        } )

        

    }, [])

    useEffect(() => {

        var mastery = parseFloat(localStorage.getItem("mastery"))
        
        const decimals = mastery - Math.floor(mastery);

        setMasteryLvl(Math.floor(mastery))
        setCompetency(decimals.toFixed(1) * 10)

        setProgress(((mastery / 8) * 100).toFixed(1))

        if ((mastery / 8) * 100 == 100) {
            setStatus("Completed")
        }
        
        axios.get("http://localhost:8000/api/users/1/no_page/", {
            headers: {
                Authorization: `Token ${token}`,
            }
        }).then((response) => {
            var count = 0;
            var count_passed = 0;

            response.data.forEach(element => {
                count += 1
                if (element.mastery == 8.0) {
                    count_passed =+ 1
                }
            });
            console.log(count)

            setCurrentUsers(count)
            setPassed(count_passed)

        }).catch((err) => {

        })

    })

        
    const pretest_score = localStorage.getItem("pretest")
    return (
        <>
        { role && role == "admin" ? 
        <>
        <div className="w-full min-h-44 grid grid-cols-1 md:grid-cols-3 gap-9 mb-5 animate-fade">
            <div className="bg-white rounded shadow h-44 w-full p-3 border-s-blue-700 border-s-8">
                
                <p className="uppercase font-bold text-blue-gray-800 tracking-wider text-xl p-3">Current Students</p>
                <div className="flex gap-5 w-2/3 p-3 mx-auto justify-evenly text-2xl items-center">
                    <FaceRoundedIcon color="primary" fontSize="large" style={{fontSize: '50px'}} /> | <p className="font-semibold text-blue-gray-800">{currentUsers}</p>
                </div> 

            </div>
            <div className="bg-white rounded shadow h-44 w-full p-3 border-s-green-700 border-s-8">

                <p className="uppercase font-bold text-blue-gray-800 tracking-wider text-xl p-3">Passed the Course</p>
                <div className="flex gap-5 w-2/3 p-3 mx-auto justify-evenly text-2xl items-center">
                    <VerifiedIcon color="success" fontSize="large" style={{fontSize: '50px'}} /> | <p className="font-semibold text-blue-gray-800">{passed}</p>
                </div>
                
            </div>
            <div className="bg-white rounded shadow h-44 w-full p-3 border-s-teal-700 border-s-8">

                <p className="uppercase font-bold text-blue-gray-800 tracking-wider text-xl p-3">Current Batch</p>
                <div className="flex gap-5 w-2/3 p-3 mx-auto justify-evenly text-2xl items-center">
                    <Diversity3Icon fontSize="large" style={{fontSize: '50px', color: "teal"}} /> | <p className="font-semibold text-blue-gray-800">2024</p>
                </div>

            </div>
        </div>

        {/* <h3 className="p-4 uppercase font-black text-xl text-blue-gray-700 tracking-wide">Analytics</h3> */}
        <div className="rounded-lg drop-shadow-md p-5 my-5 bg-white">
            <img src={img1} className="block w-full h-72" alt="img" />
        </div>

         </>: 
         
         role && role == "student" ? 
         
         <>
         <div className="w-full min-h-44 grid grid-cols-1 md:grid-cols-3 gap-9 mb-5">
            <div className="bg-white rounded shadow h-44 w-full p-3 border-s-indigo-700 border-s-8">
                
                <p className="uppercase font-bold text-blue-gray-800 tracking-wider text-xl p-3">Current Mastery Level</p>
                <div className="flex gap-5 w-2/3 p-3 mx-auto justify-evenly text-2xl items-center">
                    <DirectionsRunIcon className="text-indigo-900" fontSize="large" style={{fontSize: '50px'}} /> | <p className="font-semibold text-blue-gray-800">Lvl {masterylvl}</p>
                </div>

            </div>
            <div className="bg-white rounded shadow h-44 w-full p-3 border-s-green-700 border-s-8">

                <p className="uppercase font-bold text-blue-gray-800 tracking-wider text-xl p-3">Current Competency Level</p>
                <div className="flex gap-5 w-2/3 p-3 mx-auto justify-evenly text-2xl items-center">
                    <SignalCellularAltIcon color="success" fontSize="large" style={{fontSize: '50px'}} /> | <p className="font-semibold text-blue-gray-800">{competency}</p>
                </div>
                
            </div>
            <div className="bg-white rounded shadow h-44 w-full p-3 border-s-teal-700 border-s-8">

                <p className="uppercase font-bold text-blue-gray-800 tracking-wider text-xl p-3">Pre-Test Score</p>
                <div className="flex gap-5 w-2/3 p-3 mx-auto justify-evenly text-2xl items-center">
                    <EditNoteIcon fontSize="large" style={{fontSize: '50px', color: "teal"}} /> | <p className="font-semibold text-blue-gray-800">{pretest_score} / 30</p>
                </div>

            </div>
        </div>

        <h3 className="p-4 uppercase font-black text-xl text-blue-gray-700 tracking-wide">Progress</h3>
        
        <div className="shadow rounded-md bg-white min-h-24 p-8 mb-6">
            <ProgressBar statusText={status} progressValue={progress} percentage={progress}/>
        </div>
        <h3 className="p-4 uppercase font-black text-xl text-blue-gray-700 tracking-wide">Quick Links</h3>
        
        <div className="shadow rounded-md bg-white min-h-24 p-8">
            <div className="grid md:grid-cols-4 gap-5">


                <Button variant="gradient" className="rounded-full" disabled fullWidth>Chats</Button>
                <Button variant="gradient" color="deep-purple" className="rounded-full" disabled fullWidth>Feedbacks</Button>
                
            </div>
        </div>
         </> : null}

         </>
    )
}

