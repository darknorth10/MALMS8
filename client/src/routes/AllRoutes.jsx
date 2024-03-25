import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthLayout } from '../components/layouts/AuthLayout'
import { InsideLayout } from '../components/layouts/InsideLayout'
import { Signin, Signup, Activate } from '../pages/auth'
import { JoinClass, Dashboard, Classes, Accounts, GroupChats, Activities, Profile } from '../pages/internal'


export default function AllRoutes() {
  return (
    <Routes>
        <Route element={<AuthLayout/>}>
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/activate/:uid/:token' element={<Activate />} />
        </Route>
        <Route element={<InsideLayout/>}>
            <Route path='/join-class' element={<JoinClass/>} />
            <Route path='/classes' element={<Classes/>} />
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/chats' element={<GroupChats/>} />
            <Route path='/accounts' element={<Accounts/>} />
            <Route path='/activities' element={<Activities/>} />
            <Route path='/my-profile' element={<Profile/>} />
        </Route>
    </Routes>

  )
}
