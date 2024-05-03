import React from 'react'

export const References = ({refImg}) => {
  return (
    <div className='max-w-screen-2xl mx-auto p-5 rounded drop-shadow grid grid-cols-1 gap-8'>
        <p className='bg-light-blue-50 text-lg text-blue-gray-800 border-s-4 border-light-blue-500 p-10 leading-loose tracking-wide font-base'>
            <span className='font-bold text-xl'>Note: </span>
            Several images and sticker templates utilized in the module were sourced from Canva, a platform offering free design resources. These resources were accessed within the guidelines and terms of use provided by Canva.
        </p>

        <div>
            <img src={refImg} className='block mx-auto rounded-md drop-shadow-md' alt="reference_img" />
        </div>
    </div>
  )
}
