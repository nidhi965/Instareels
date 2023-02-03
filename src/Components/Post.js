import React from 'react'
import {useState,useEffect,useContext} from 'react'
import { AuthContext } from '../Context/AuthContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReactDOM from 'react-dom'

import Avatar from '@mui/material/Avatar';
import { db } from '../firebase'
import { arrayRemove } from 'firebase/firestore';
import {
    
    arrayUnion,
    doc,
    
    updateDoc
  } from "firebase/firestore";
export default function Post({postData,userData}) {
  
  const {user}=useContext(AuthContext);
  const [like,setLike]=useState(false);
  useEffect(()=>{
if(postData.likes.length){
  setLike(true)
}
else{
  setLike(false)
}
  },[postData])
     
  
 /* const handlelike=()=>{
   
   setLike(postData.likes.length++)
   
  }
  const handledislike=()=>{
    setLike(--postData.likes.length)
  }*/
  const handlelike=async()=>{
   
      const washingtonRef = doc(db, "posts", postData.postId);

      // Atomically add a new region to the "regions" array field.
      await updateDoc(washingtonRef, {
        likes:arrayUnion(userData.uid)
      });
        console.log("done")

      
      
}
const handledislike=async()=>{
  const washingtonRef = doc(db, "posts", postData.postId);

      // Atomically add a new region to the "regions" array field.
      await updateDoc(washingtonRef, {
        likes:arrayRemove(userData.uid)
      });
        console.log("remove")

      }


  const callback = (entries) => {
    entries.forEach((entry)=>{
        let ele = entry.target.childNodes[0]
        console.log(ele)
        ele.play().then(()=>{
            if(!ele.paused && !entry.isIntersecting){
                ele.pause()
            }
        })
    })
}
let observer = new IntersectionObserver(callback, {threshold:0.6});
useEffect(()=>{
    const elements = document.querySelectorAll(".post-container")
    elements.forEach((element)=>{
        observer.observe(element)
    })
},[])
const handleClick = (e) => {
  e.preventDefault();
  e.target.muted = !e.target.muted
}
const handleScroll = (e) => {
  let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling
  if(next){
      next.scrollIntoView()
      e.target.muted = true
  }
}
  return (
    <>
    <div className='post-container'>
     
    <video src={postData.postUrl} muted="muted" onEnded={handleScroll}  onClick={handleClick}/>
   
    <div className='videos-info'>
      <div className='avatar-con'> <Avatar alt="Remy Sharp" src={postData.profileUrl} />
      <p style={{color:'white',fontWeight:'bold'}}>{postData.profileName}</p>
      </div>
    
      
      <div className='like'>
        <FavoriteIcon fontSize='large' style={like?{color:'red'}:{color:'white'}} onClick={handlelike}/>
        {
          postData.likes.length>0 &&  like
        }
       <FavoriteIcon fontSize='medium' style={{color:'black'}} onClick={handledislike}/>
        </div>


        </div>
        </div>

       
        
            </>
  )
}
