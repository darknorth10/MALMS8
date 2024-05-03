import React from 'react'
import { Question } from '../shared/assessments/Question'


export const AssessmentLayout = () => {
  return (
    <div className='max-w-screen-2xl mx-auto p-5'>
        <p>title</p>
        <p>directions</p>

        <div className='my-10'>
            
            <div>
                <p>{question}</p>
                <Question/>
            </div>
            
        </div>
    </div>
  )
}
