import { PaperClipIcon, PencilIcon, PencilSquareIcon } from '@heroicons/react/20/solid'
import { Button } from '@material-tailwind/react'

export default function ProfileLayout() {


  const name = `${localStorage.getItem("firstname")} ${localStorage.getItem('lastname')}`;
  const lrn = localStorage.getItem('lrn')
  const email = localStorage.getItem('email')
  const role = localStorage.getItem('role')

  return (
    <div>
      <div className="px-4 sm:px-0 flex justify-start gap-5">
        <div>
            <img src="https://cdn-icons-png.flaticon.com/128/2609/2609282.png" className='w-14 h-14 rounded-full' alt="" />
        </div>
        <div>
            <h3 className="text-base font-semibold leading-7 text-gray-900 uppercase">My Profile</h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details</p>
        </div>
        
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100 grid grid-cols-2">
          <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0 ">
            <dt className="text-sm font-semibold leading-6 text-blue-gray-700 uppercase">Full name:</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{name}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
            <dt className="text-sm font-semibold leading-6 text-blue-gray-700 uppercase">Role:</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{role}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
            <dt className="text-sm font-semibold leading-6 text-blue-gray-700 uppercase">LRN / TID:</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{lrn}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
            <dt className="text-sm font-semibold leading-6 text-blue-gray-700 uppercase">Email:</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{email}</dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
            <dt className="text-sm font-semibold leading-6 text-blue-gray-700 uppercase">Class:</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Sampaguita - 2024</dd>
          </div>

          {/* <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
            <dt className="text-sm font-semibold leading-6 text-blue-gray-700 uppercase">Password:</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <Button variant='gradient' color='blue' size='sm'>Change Password</Button>
            </dd>
          </div>
          
          <div className='py-6'>
            <Button variant='outlined' color='teal' className='flex gap-2'>
              <span>Edit Profile</span>
              <PencilSquareIcon className='h-4'/>
            </Button>
          </div> */}
        </dl>
      </div>
    </div>
  )
}
