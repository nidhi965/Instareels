import React from 'react'
import ResponsiveAppBar from './ResponsiveAppBar'
import Upload from './Upload'
import Post from './Post'
import { useState,useEffect,useContext } from 'react';
import './Feed.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import video1 from '../Assests/panda.mp4.mp4'
import video2 from '../Assests/panda2.mp4.mp4'
import Avatar from '@mui/material/Avatar';
import { AuthContext } from '../Context/AuthContext';
import { auth,db,storage } from '../firebase'
import { onSnapshot, orderBy,query } from 'firebase/firestore';
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    setDoc,
  } from "firebase/firestore";
import { SettingsInputCompositeSharp } from '@mui/icons-material';

export default function Feed() {
   
    const [userData,setUserData] = useState({})
    const  [posts,setPosts]=useState([])

   useEffect(() => {
    const unsub = auth.onAuthStateChanged((authObj) => {
      unsub();
      if (authObj) {
        // logged in, use authObj
        const user = auth.currentUser;
        console.log(user.uid);
        const unsub=onSnapshot(doc(db,"users",user.uid),(doc)=>{
            console.log(doc.data());
            setUserData(doc.data())
        })
        return ()=>{
          unsub();
        }
      } else {
        // not logged in
        console.log('not log');
      }
    });
  }, []);
     useEffect(()=>{
      const unsub=onSnapshot(query(collection(db,"posts"),orderBy("timestamp","desc")),
      (snapshot)=>{
        let temparray=[]
        snapshot.docs.map((doc)=>{
            temparray.push(doc.data())
        })
       setPosts([...temparray])
        console.log(temparray)
      })
      return ()=>{
        unsub();
      }
     },[])
     console.log(userData)
    return (
        <div className='feed-container'>
        <ResponsiveAppBar postData={posts} userData={userData} />
        <Upload userData={userData}/>
        <div className='videos-container'>
          {
            posts.map((post)=>(
              <Post postData={post} userData={userData}></Post>
            ))
          }
      
        </div>
        </div>
        )
      }
      
