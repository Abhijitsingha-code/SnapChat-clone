import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import WebcamComponent from "./components/WebcamComponent";
import Preview from "./components/Preview";
import Chats from "./components/Chats";
import ChatView from "./components/ChatView";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/appSlice";
import Login from "./components/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth,(authUser)=>{
      if(authUser){
        dispatch(login({
          username: authUser.displayName,
          profilePic: authUser.photoURL,
          id: authUser.uid
      }))
      }else{
        dispatch(logout())
      }
    })
  }, []);
  return (
    <div className="app">
      <BrowserRouter>
        {!user ? (
          <Login />
        ) : (
         <>
          <img className="app_logo" src="https://i.pinimg.com/originals/22/6e/28/226e28de7d1b42057e19dd7aa34a4bc2.png" alt=""/>
          <div className="app_body">
            <div className="app_body_background">
              <Routes>
                <Route path="/" element={<WebcamComponent />} />
                <Route path="/preview" element={<Preview />} />
                <Route path="/chats" element={<Chats />} />
                <Route path="/chats/view" element={<ChatView />} />
              </Routes>
            </div>
          </div>
         </>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
