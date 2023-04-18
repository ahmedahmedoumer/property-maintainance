import React from 'react'
import { CaretRightFill } from 'react-bootstrap-icons';
import UserProfile from '../UI/UserProfile';
import profileImage from '../../assets/gym-guy.png';
import Spinner from '../UI/Spinner';
import "../../index.css";
import bg from "../../assets/bg.jpg"
const RightSidebar = (props) => {
  return (
    <div
        className="h-full flex flex-row sticky text-sm top-0 right-0"
        x-data="{ sidenav: true }"
        style={{backgroundImage: `url(${bg})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}
        >
        <div
            id="sidebar"
            className="scroll5 bg-gray-100 px-6 h-screen md:block w-24 md:w-60 lg:w-72 overflow-x-hidden transition-transform duration-300 ease-in-out"
            x-show="sidenav"
            style={{backdropFilter: `blur(20px)`}}
            >
            <div className="pt-6">
                <UserProfile/>                        
            </div>
            <ul className='border-y mt-6 pb-6 space-y-2'>
                <h2 className='font-semibold my-6'>Recent Posts</h2>
                {props.isLoading && <Spinner type="main"/>}
                {props.error && <p className='text-center'>{props.error}</p>}
                {props.posts && props.posts.map((post) => (
                    <li className='border-b py-3' key={post._id}>
                        <h3 className='font-semibold pb-2'>{post.title}</h3>
                        <p className='py-2'>{post.description}</p>
                        <span className='text-gray-500 text-sm'>{post.date}</span>
                    </li>
                ))
                }
                <button className='py-1 w-full text-sm text-center text-gray-700 bg-gray-200 hover:bg-gray-300 flex justify-center items-center'>View all posts <CaretRightFill/></button>
            </ul>
            <ul className='border-b mt-6 pb-6 space-y-2'>
            <h2 className='font-semibold my-6'>Newly Joined Users</h2>
                {
                    <li className='flex justify-between border-b py-3'>
                        <div>
                            <p className='py-2'>User's name</p>
                            <span className='text-gray-500 text-sm'>2023-3-4</span>
                        </div>
                        <img className='rounded-full w-10 h-10' src={profileImage} alt=''/>
                    </li>
                }
                <button className='py-1 w-full text-sm text-center text-gray-700 bg-gray-200 hover:bg-gray-300 flex justify-center items-center'>View all users <CaretRightFill/></button>
            </ul>
        </div>
    </div>
  )
}

export default RightSidebar;