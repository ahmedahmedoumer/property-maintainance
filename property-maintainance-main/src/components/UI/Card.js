import React from 'react'

const Card = (props) => {
  return (
    <div className={`relative rounded-lg h-[200px] text-white p-4 ${props.className}`}>
        {props.children}
        <svg className={`absolute top-0 rotate-180 left-0`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" fillOpacity="0.3" d="M0,64L80,96C160,128,320,192,480,181.3C640,171,800,85,960,48C1120,11,1280,21,1360,26.7L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" fill-opacity="0.3" d="M0,192L1440,128L1440,320L0,320Z"></path></svg> */}
    </div>
  )
}

export default Card