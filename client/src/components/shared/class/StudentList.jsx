import {
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Card,
    Typography,
  } from "@material-tailwind/react";

import axios from "axios";

import { useEffect, useState } from "react";
   
  export const StudentList = () => {

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
            return (
              <ListItem key={key}>
                <ListItemPrefix>
                  <Avatar variant="circular" alt="candice" src={student.profile_img} />
                </ListItemPrefix>
                <div>
                  <Typography variant="h6" color="blue-gray">
                    {student.first_name} {student.last_name} | {student.lrn} 
                  </Typography>
                  <Typography variant="small" color="gray" className="font-normal">
                    {student.email}
                  </Typography>
                </div>
              </ListItem>
            )

          })}
          

        </List>
      </Card>
    );
  }