import React from 'react'
import ResponsiveAppBar from './ResponsiveAppBar'

import './Profile.css';

import ReactDOM from 'react-dom'
import { useState,useEffect,useContext } from 'react';
import { auth,db } from '../firebase'
import { onSnapshot, orderBy,query,where } from 'firebase/firestore';
import { AuthContext } from '../Context/AuthContext';
import {
 
    collection,
    doc,
    
  } from "firebase/firestore";

export default function Profile() {
  const {user} =useContext(AuthContext)
  console.log(user)
  const [userData,setUserData] = useState({})
  const [postIds,setPostIds]=useState([])
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
            setUserData(doc.data());
            setPostIds(doc.data().posts)
        })
        return ()=>{
          unsub();
        }
      } else {
        // not logged in
        console.log('not log');
      }
    });
  }, [user]);
  
console.log(postIds)


  useEffect(()=>{
   postIds.map(async (postid,idx)=>{
    const unsub=onSnapshot(query(collection(db,"posts"),orderBy("timestamp","desc")),
    (snapshot)=>{
      let temparray=[]
      snapshot.docs.map((doc)=>{
          temparray.push(doc.data())
      })
     
     setPosts([...temparray])
      console.log(temparray)
    })
  })
    
   },[postIds])
  
    
   /*useEffect(async () =>{
    let tempArray=[]
   await postIds.map(async (postid,idx)=>{
      const unsub=onSnapshot(doc(db,"posts",postid),(doc)=>{
        tempArray.push(doc.data())
        console.log(tempArray)
       setPosts([...tempArray])
      })
    })
   },[postIds])*/
   console.log(posts.postUrl)

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
    const elements = document.querySelectorAll(".profile-vid")
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
    <div>
        <ResponsiveAppBar userData={userData}/>
        <div className='profile-con'>
            <img src={userData?.photoURL} style={{height:"8rem",width:"8rem",borderRadius:"50%"}}></img>
            <div>
                <h1>{userData?.name}</h1>
                <h3>email: {userData?.email}</h3>
              
                <h3>posts: {posts?.length}</h3>

            </div>
        </div>
        <hr></hr>
        <div className='profile-vid'>
      {
            posts.map((post)=>(
            
              <video  src={post?.postUrl} muted="muted" onEnded={handleScroll}  onClick={handleClick} autoPlay={true} />
            
            ))

            
          }
          
            {/*<video src={video2}/>
            <video src={video2}/>
        <video src={video2}/>*/}
        </div>
    </div>
  )
}
