import { Avatar } from '@mui/material'
import React from 'react'
import './Chat.css'
import ReactTimeago from 'react-timeago';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import { useDispatch } from 'react-redux';
import { selectImage } from '../features/appSlice';
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';

const Chat = ({id, username, read, imageUrl, profilepic, timestamp }) => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const open = async () =>{
    dispatch(selectImage(imageUrl))

    // if(!read){
    //   dispatch(selectImage(imageUrl))
    //   console.log(imageUrl)
    // }
    await setDoc(doc(db,'posts', `${id}`), {
      read: true
    },
    {merge: true}
    );

    navigate('/chats/view')
  }

  return (
    <div onClick={open} className='chat'>
      <Avatar className='chat__avatar' src={profilepic}/>
      <div className="chat__info">
          <h4>{username}</h4>
          <p>{!read && 'Tap to view - '} <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()}/></p>
      </div>
      {!read && <StopRoundedIcon className='chat__readIcon'/>}
    </div>
  )
}

export default Chat