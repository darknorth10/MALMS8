import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LogoutIcon from '@mui/icons-material/Logout';
import { Tooltip } from '@mui/material';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useNavigate } from "react-router-dom"

export const mainListItems = ({setOpenSignOut, handleSignoutOpen}) => {

  const redirext = useNavigate()

  const role = 'admin'
  console.log(role)

  return (
  <>

    <Tooltip title="Dashboard" placement="right-start">
      <ListItemButton onClick={() => redirext('/dashboard')}>
        <ListItemIcon>
          <DashboardIcon className='text-blue-gray-800' />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Tooltip>

    <Tooltip title="My Profile" placement="right-start">
      <ListItemButton onClick={() => redirext('/my-profile')}>
        <ListItemIcon>
          <ManageAccountsIcon className='text-blue-gray-800' />
        </ListItemIcon>
        <ListItemText primary="My Profile" />
      </ListItemButton>
    </Tooltip>

    {role && role == "admin" ? <Tooltip title="Accounts" placement="right-start">
      <ListItemButton onClick={() => redirext('/accounts')}>
        <ListItemIcon>
          <PeopleIcon className='text-blue-gray-800' />
        </ListItemIcon>
        <ListItemText primary="Accounts" />
      </ListItemButton>
    </Tooltip> : null}

    <Tooltip title="Classes" placement="right-start">
      <ListItemButton onClick={() => redirext('/classes')}>
        <ListItemIcon>
          <AssignmentIcon className='text-blue-gray-800'/>
        </ListItemIcon>
        <ListItemText primary="Classes" />
      </ListItemButton>
    </Tooltip>

    {role && role == "admin" || role == "teacher" ? <Tooltip title="Activities" placement="right-start">
      <ListItemButton onClick={() => redirext('/activities')}>
        <ListItemIcon>
          <BarChartIcon className='text-blue-gray-800'/>
        </ListItemIcon>
        <ListItemText primary="Activities" />
      </ListItemButton>
    </Tooltip> : null }


    <Tooltip title="Group Chats" placement="right-start">
      <ListItemButton  onClick={() => redirext('/chats')}> 
        <ListItemIcon>
          <ChatRoundedIcon className='text-blue-gray-800'/>
        </ListItemIcon>
        <ListItemText primary="Group Chats" />
      </ListItemButton>
    </Tooltip>


    <Tooltip title="Sign Out" placement="right-start">
      <ListItemButton onClick={handleSignoutOpen}>
        <ListItemIcon>
          <LogoutIcon className='text-blue-gray-800'/>
        </ListItemIcon>
        <ListItemText primary="Sign Out" />
      </ListItemButton>
    </Tooltip>

    
  </>
)}
