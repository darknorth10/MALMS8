import { useEffect, useState  } from "react"
import { useOutletContext } from "react-router-dom"
import Acts from "../../../components/shared/class/Acts"
import { useParams } from "react-router-dom"
import axios from "axios"
import GradingDialog from "../../../components/shared/class/GradingDialog"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Activities = () => {
    const notify = () => toast.success("Successfully Graded");
    const { id } = useParams()
    const [acts, setActs] = useState([])
    const token = localStorage.getItem("token")
    const [refresh, setRefresh] = useState()

    // for dialog 
    const [selectedAct, setSelectedAct] = useState({student: '', act: ''})
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const { setPagename, setCurrent } = useOutletContext();
    const [student, setStudent] = useState({})
    useEffect(() => {
        // set page name
        setPagename("Activities")

        // indicate that this is the current page
        setCurrent(true)

    }, [setPagename, setCurrent])

    useEffect(() => {

        axios.get(`http://localhost:8000/auth/users/${id}/`, {
            headers: {
                Authorization: `Token ${token}`,
            }
        }).then((response) => {
            setStudent(response.data)
        }).catch((err) => {
            console.log(err)
        })

    })

    useEffect(() => {
        axios.get(`http://localhost:8000/api/activities/${id}/user/`, {})
        .then((response) => {
            setActs(response.data)
            console.log(response.data)
            console.log(id)
        }).catch((err) => {

        })

    
    }, [])
    return (
        <>
        <ToastContainer 
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover
            theme="light"
           
            transition: Bounce
        />

        <div className="w-full min-h-7/8 flex flex-col gap-10  justify-center">
            <h3 className="mt-5 text-2xl uppercase">Student Activities of : <span className=" text-blue-600">{student.first_name} {student.last_name} ( {student.lrn} )</span></h3>
            <Acts rows={acts} handleClickOpen={handleClickOpen} setSelectedAct={setSelectedAct}/>
        </div>

        <GradingDialog notify={notify} open={open} setOpen={setOpen} handleClickOpen={handleClickOpen} handleClose={handleClose} data={selectedAct} refresh={setActs}/>
        </>
    )
}

