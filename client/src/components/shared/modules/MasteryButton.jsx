import React from 'react'
import { Button } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'

export const MasteryButton = ({url, disable, level}) => {
    const redirect = useNavigate()

  return (
    <div className='grid grid-cols-1 gap-4 py-5 mt-10'>
        <p className='w-2/3 font-semibold mx-auto mb-5 p-5 bg-indigo-50 rounded border-s-4 border-indigo-400'>
            <span className='uppercase me-2 text-blue-gray-800 text-lg'>Note: </span>
            Please review first before taking the level mastery assessment, Goodluck Learner!
        </p>
        <p className='w-2/3 font-semibold mx-auto mb-5 p-5 bg-indigo-50 rounded border-s-4 border-indigo-400'>
            <span className='uppercase me-2 text-blue-gray-800 text-lg'>Requirements: </span>
            You must pass all formative assessments in module {level}
        </p>

        <Button variant='gradient' color='indigo' disabled={disable} className='w-2/3 mx-auto' onClick={() => redirect(url)}>Take Level {level} Mastery Assesment</Button>
    </div>
  )
}
