import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import "./Chats.css";
import { auth, db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/appSlice";
import { signOut } from "firebase/auth";
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import { useNavigate } from "react-router-dom";
import { resetCameraImage } from "../features/cameraSlice";

const Chats = () => {
  const [posts, setPosts] = useState([]);
  const postRef = collection(db, "posts");
  const user = useSelector(selectUser)
  const navigate = useNavigate()
  const dispatch = useDispatch();

  useEffect(() => {
    const q = query(postRef, orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const takeSnap = () =>{
    dispatch(resetCameraImage());
    navigate('/')
  }
  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar src={user.profilePic} onClick={()=>signOut(auth)} className="chats__avatar" />
        <div className="chats__search">
          <SearchIcon />
          <input placeholder="Friends" type="text" />
        </div>
        <ChatIcon className="chats_chatIcon" />
      </div>

      <div className="chats__post">
        {posts?.map(
          ({
            id,
            data: { username, read, imageUrl, profilePic, timestamp },
          }) => (
            <Chat 
              key={id}  
              id={id}
              username={username}
              read={read}
              imageUrl={imageUrl}
              profilepic={profilePic}
              timestamp={timestamp} 
            />
          )
        )}
      </div>
      <RadioButtonUncheckedRoundedIcon
        className="chats__radiobtn"
        onClick={takeSnap}
        fontSize='large'
      />
    </div>
  );
};

export default Chats;
