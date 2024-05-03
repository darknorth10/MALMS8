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
   
  export const Feedbacks = () => {
    const redirect = useNavigate()
    const role = localStorage.getItem("role")
    const uid = localStorage.getItem("id")
    const [students, setStudents] = useState([])
    let id = localStorage.getItem('class_id')
    const token = localStorage.getItem('token')

    const [feedbacks, setFeeds] = useState([])

    useEffect(() => {
      
      axios.get(`http://localhost:8000/api/activities/${uid}/user/`, {})

        .then((response) => {
          setFeeds(response.data)
          console.log(response.data)
        }).catch((err) => {
          console.log(err)
        })


    }, [])


    return (
      <div className="max-w-screen-xl mx-auto my-5 bg-white drop-shadow rounded p-8">
        <h4 className="font-semibold antialiased text-blue-gray-800 uppercase">Activity Feedbacks</h4>

        <div className="w-2/3 mx-auto grid grid-cols-1 gap-8 p-8">

          {
            feedbacks.map((item, key) => {
              let a = item.feedback
              return (
              <div className="px-8 py-3 drop-shadow-md bg-blue-800 rounded text-white" key={key}>
                    <div className="flex justify-between">
                      <p>Activity # {item.act_no}</p>
                      <p className="uppercase">Score: {item.grade ? item.score : 0}</p>
                    </div>
                    <div className="rounded bg-white drop-shadow-md p-6 my-4">
                      <p className=" text-blue-gray-800 leading-relaxed tracking-wide indent-16"> {item.feedback ? item.feedback : "No Feedback"}.</p>
                    </div>
              </div>
              )
            }) 
          }
          
        </div>

      </div>
    );
  }