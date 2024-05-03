import React from 'react'
import { Button } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'

export const AssessmentButton = ({url, disable}) => {
    const redirect = useNavigate()

  return (
    <div className='grid grid-cols-1 gap-4 py-5'>
        <p className='w-2/3 font-semibold mx-auto mb-5 p-5 bg-light-blue-50 rounded border-s-4 border-blue-400'>
            <span className='uppercase me-2 text-blue-gray-800 text-lg'>Note: </span>
            Please review first before taking the formative assessment, Goodluck Learner!
        </p>

        <Button variant='gradient' color='blue' disabled={disable} className='w-2/3 mx-auto' onClick={() => redirect(url)}>Take Formative Assesment</Button>
    </div>
  )
}
