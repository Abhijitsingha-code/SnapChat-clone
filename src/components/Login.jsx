import { Button } from '@mui/material'
import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../features/appSlice'
import { auth, provider } from '../firebase'
import './Login.css'

const Login = () => {
    const dispatch = useDispatch()
    const signIn=()=>{
        signInWithPopup(auth,provider).then((result)=>{
            dispatch(login({
                username: result.user.displayName,
                profilePic: result.user.photoURL,
                id: result.user.uid
            }))
        }).catch(err=>console.log(err))
    }
  return (
    <div className='login'>
        <div className="login_container">
            <img src="https://i.pinimg.com/originals/22/6e/28/226e28de7d1b42057e19dd7aa34a4bc2.png" alt="" />
            <Button variant='outlined' onClick={signIn}>SignIn</Button>
        </div>
    </div>
  )
}

export default Login