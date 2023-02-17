import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetCameraImage, selectCaptureImage } from '../features/cameraSlice'
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import './Preview.css'
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CreateIcon from '@mui/icons-material/Create';
import NoteIcon from '@mui/icons-material/Note';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CropIcon from '@mui/icons-material/Crop';
import TimerIcon from '@mui/icons-material/Timer';
import SendIcon from '@mui/icons-material/Send';
import { v4 as uuid } from 'uuid';
import { ref,uploadString, getDownloadURL } from "firebase/storage";
import{ db, storage } from '../firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { selectUser } from '../features/appSlice';


const Preview = () => {
  const imageSrc = useSelector(selectCaptureImage)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const imageRef = collection(db, 'posts');
  const user = useSelector(selectUser)

  useEffect(()=>{
    if(!imageSrc){
      navigate('/')
    }
  },[imageSrc])

  const closePreview=()=>{
    dispatch(resetCameraImage());
  }

  const sendPost = async () =>{
      const id = uuid();
      const storageRef= ref(storage, `posts/${id}`)
      await uploadString(storageRef, imageSrc, 'data_url');

      await getDownloadURL(storageRef).then((url) => {
          addDoc(imageRef, {
            username: user.username,
            read: false,
            imageUrl: url,
            profilePic: user.profilePic,
            timestamp: serverTimestamp()
          })
          navigate('/chats')
        });
  }

  return (
    <div className='preview'>
      <CloseIcon onClick={closePreview} className='preview__close'/>
      <div className="preview__toolbarRight">
          <TextFieldsIcon/>
          <CreateIcon/>
          <NoteIcon/>
          <MusicNoteIcon/>
          <AttachFileIcon/>
          <CropIcon/>
          <TimerIcon/>
      </div>
      <img src={imageSrc} alt=''/>
      <div onClick={sendPost} className="preview__footer">
        <h2>Send Now</h2>
        <SendIcon fontSize='small' className='preview_sendIcon'/>
      </div>
    </div>
  )
}

export default Preview