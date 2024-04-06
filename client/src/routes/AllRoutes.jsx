import { Routes, Route } from 'react-router-dom'
import { AuthLayout } from '../components/layouts/AuthLayout'
import { InsideLayout } from '../components/layouts/InsideLayout'
import { Signin, Signup, Activate } from '../pages/auth'
import { JoinClass, Dashboard, Classes, Accounts, GroupChats, Activities, Profile, MyClass, ClassRoom }
from '../pages/internal'

import {
  Module1
}
from '../pages/modules/index'

export default function AllRoutes() {
  return (
    <Routes>
        <Route element={<AuthLayout/>}>
            <Route path='/' element={<Signin />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/activate/:uid/:token' element={<Activate />} />
        </Route>
        <Route element={<InsideLayout/>}>
            <Route path='/join-class' element={<JoinClass/>} />
            <Route path='/classes' element={<Classes/>} />
            <Route path='/classroom' element={<ClassRoom />} />
            <Route path='/my-class' element={<MyClass/>} />
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/chats' element={<GroupChats/>} />
            <Route path='/accounts' element={<Accounts/>} />
            <Route path='/activities' element={<Activities/>} />
            <Route path='/my-profile' element={<Profile/>} />
        </Route>

        <Route element={<InsideLayout/>}>
            <Route path='/module/1/1' element={<Module1/>}/> 
        </Route>
    </Routes>

  )
}
