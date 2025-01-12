import React from 'react'
import Register from '../components/04_RegisterOrLogin/01_Register'

function RegisterOrLogin() {
  return (
    <div className='mt-[60px] w-full min-h-screen flex items-center justify-center'>
      <Register isOpen={true} onClose={() => {}} />
    </div>
  )
}

export default RegisterOrLogin