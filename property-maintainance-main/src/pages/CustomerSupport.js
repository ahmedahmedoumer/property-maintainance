import React from 'react'
import Messages from '../components/Messages/Messages'

const CustomerSupportPage = (props) => {
  return (
    <Messages socket={props.socket}/>
  )
}

export default CustomerSupportPage