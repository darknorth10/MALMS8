import { Routes, Route } from 'react-router-dom'
import { AuthLayout } from '../components/layouts/AuthLayout'
import { InsideLayout } from '../components/layouts/InsideLayout'
import { Signin, Signup, Activate } from '../pages/auth'
import { JoinClass, Dashboard, Classes, Accounts, GroupChats, Activities, Profile, MyClass, ClassRoom }
from '../pages/internal'

import {
  Module1, Module2, Module3, Module4, Module5, Module6, Module7, Module8, Module9, Module10, Module11, Module12, Module13, Module14, Module15, Module16, Module17, Module18, Module19, Module20, Module21, Module22, Module23, Module24, Module25, Module26, Module27, Module28, Module29, Module30, Module31, Module32, Module33, Module34, Module35, Module36, Module37, Module38, Module39, Module40, Module41, Module42,
} from '../pages/modules/index'

import {PreTest} from "../pages/internal/assessments/PreTest"
import { Formative } from '../pages/internal/assessments/FormativeMain/Formative1'
import { Mastery } from '../pages/internal/assessments/Mastery/Mastery'
import { PostTest } from '../pages/internal/assessments/PostTest'

import { Feedbacks } from '../components/shared/class/Feedbacks'



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
            <Route path='/my-feedbacks' element={<Feedbacks/>} />
            <Route path='/accounts' element={<Accounts/>} />
            <Route path='/activities' element={<Activities/>} />
            <Route path='/activities/:id' element={<Activities/>} />
            <Route path='/my-profile' element={<Profile/>} />
        </Route>

        <Route element={<InsideLayout/>}>
            <Route path='/module/1/1' element={<Module1/>}/> 
            <Route path='/module/1/2' element={<Module2/>}/> 
            <Route path='/module/1/3' element={<Module3/>}/> 
            <Route path='/module/1/4' element={<Module4/>}/> 
            <Route path='/module/1/5' element={<Module5/>}/> 
            <Route path='/module/1/6' element={<Module6/>}/> 
            <Route path='/module/1/7' element={<Module7/>}/> 
            <Route path='/module/2/1' element={<Module8/>}/> 
            <Route path='/module/2/2' element={<Module9/>}/> 
            <Route path='/module/2/3' element={<Module10/>}/> 
            <Route path='/module/2/4' element={<Module11/>}/> 
            <Route path='/module/2/5' element={<Module12/>}/> 
            <Route path='/module/2/6' element={<Module13/>}/> 
            <Route path='/module/2/7' element={<Module14/>}/> 
            <Route path='/module/3/1' element={<Module15/>}/> 
            <Route path='/module/3/2' element={<Module16/>}/> 
            <Route path='/module/3/3' element={<Module17/>}/> 
            <Route path='/module/3/4' element={<Module18/>}/> 
            <Route path='/module/3/5' element={<Module19/>}/> 
            <Route path='/module/3/6' element={<Module20/>}/> 
            <Route path='/module/3/7' element={<Module21/>}/>

            <Route path='/module/4/1' element={<Module22/>}/>
            <Route path='/module/4/2' element={<Module23/>}/>
            <Route path='/module/4/3' element={<Module24/>}/>
            <Route path='/module/4/4' element={<Module25/>}/>
            <Route path='/module/4/5' element={<Module26/>}/>
            <Route path='/module/4/6' element={<Module27/>}/>
            <Route path='/module/4/7' element={<Module28/>}/>
            <Route path='/module/5/1' element={<Module29/>}/>
            <Route path='/module/5/2' element={<Module30/>}/>
            <Route path='/module/5/3' element={<Module31/>}/>
            <Route path='/module/5/4' element={<Module32/>}/>
            <Route path='/module/5/5' element={<Module33/>}/>
            <Route path='/module/5/6' element={<Module34/>}/>
            <Route path='/module/5/7' element={<Module35/>}/>
            <Route path='/module/6/1' element={<Module36/>}/>
            <Route path='/module/6/2' element={<Module37/>}/>
            <Route path='/module/6/3' element={<Module38/>}/>
            <Route path='/module/6/4' element={<Module39/>}/>
            <Route path='/module/6/5' element={<Module40/>}/>
            <Route path='/module/6/6' element={<Module41/>}/>
            <Route path='/module/6/7' element={<Module42/>}/>


        </Route>

        <Route path='/pretest' element={<PreTest/>}/>
        <Route path='/post_test' element={<PostTest/>}/>
        <Route path='/formative/:mastery/' element={<Formative/>}/>
        <Route path='/mastery/:mastery/' element={<Mastery/>}/>


        
    </Routes>

  )
}
