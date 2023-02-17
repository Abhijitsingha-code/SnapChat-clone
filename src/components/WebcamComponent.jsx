import React, { useRef, useCallback } from 'react'
import './WebcamComponent.css'
import Webcam from 'react-webcam'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useDispatch } from 'react-redux';
import { setCameraImage } from '../features/cameraSlice';
import { useNavigate } from 'react-router-dom';

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user"
};

const WebcamComponent = () => {
  const webcamRef = useRef(null);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const captureImage = useCallback(()=>{
    const imageSrc = webcamRef?.current?.getScreenshot()
    dispatch(setCameraImage(imageSrc))
    navigate('/preview')
  },[webcamRef])
  

  return (
    <div className='webcam'>
        <Webcam
          ref={webcamRef}
          audio={false}
          height={videoConstraints.height}
          screenshotFormat="image/jpeg"
          width={videoConstraints.width}
          videoConstraints={videoConstraints}
        />
        <RadioButtonUncheckedIcon
          fontSize='large'
          className='webcam_button'
          onClick={captureImage}
        />
    </div>
  )
}

export default WebcamComponent;