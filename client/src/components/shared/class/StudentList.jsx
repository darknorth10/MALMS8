import {
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Card,
    Typography,
    Button
  } from "@material-tailwind/react";

import axios from "axios";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
   
  export const StudentList = () => {
    const redirect = useNavigate()
    const role = localStorage.getItem("role")
    const uid = localStorage.getItem("id")
    const [students, setStudents] = useState([])
    let id = localStorage.getItem('class_id')
    const token = localStorage.getItem('token')

    useEffect(() => {
      
      axios.get(`http://localhost:8000/api/users/${id}/enrolled/`, {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      .then((response) => {
        setStudents(response.data.results)
        
      })
      .catch((err) => {
        console.log(err)
      })


    }, [])


    return (
      <Card className="max-w-screen-md mx-auto my-5">
        <List>
          {students.map((student, key) => {
            if (student.role == "student") {
              return (
                <ListItem key={key} ripple={false}>
                  <ListItemPrefix>
                    <Avatar variant="circular" alt="candice" src={student.profile_img} />
                  </ListItemPrefix>
                  
                  <div className="flex  w-full justify-between">
  
                    <div>
                    <Typography variant="h6" color="blue-gray">
                      {student.first_name} {student.last_name} | {student.lrn} 
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                      {student.email}
                    </Typography>
                    </div>
  
                    {role != "student" ?
                    <div>
                      <Button size="sm" color="blue" onClick={() => {redirect(`/activities/${student.id}/`)}}>Activities</Button>
                    </div> : null}
                  </div>
                </ListItem>
              )
            }
            

          })}
          

        </List>
      </Card>
    );
  }