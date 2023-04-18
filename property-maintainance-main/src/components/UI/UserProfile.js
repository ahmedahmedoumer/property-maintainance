import React from 'react'
import gymGuy from "../../assets/gym-guy.png";
const UserProfile = (props) => {
  return (
    <div className='flex'>
        <img className='w-10 h-10 rounded-full border border-slate-600' src={gymGuy} alt=''/>
        <div className='flex flex-col ml-3 '>
            <span className=''>Baby</span>
            <span className='text-xs font-semibold'>Admin</span>
        </div>
    </div>
  )
}

export default UserProfile