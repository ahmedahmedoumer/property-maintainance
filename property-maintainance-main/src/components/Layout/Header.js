import React from 'react'
import { BellFill } from 'react-bootstrap-icons'
import SearchBar from '../UI/SearchBar'
import UserProfile from '../UI/UserProfile'

const Header = (props) => {
  return (
    <div className='w-full py-3 flex justify-between'>
        <div className={`flex ${props.dashboardLayout ? "w-[100%]" : "w-[80%]"}`}>
            <SearchBar dashboardLayout={props.dashboardLayout}/>
            <button className='border px-3 rounded-sm ml-2 relative'>
                <BellFill className='rotate-[20deg] w-6 h-6'/>
                <span className='bg-red-500 rounded-full text-white text-xs w-4 h-4 absolute bottom-[2px] right-[5px] flex justify-center items-center'>5</span>
            </button>
        </div>
        {!props.dashboardLayout && <UserProfile/>}
    </div>
  )
}

export default Header;