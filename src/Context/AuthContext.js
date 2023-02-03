import React,{useState,useEffect} from 'react'
import {  signInWithEmailAndPassword,createUserWithEmailAndPassword, onAuthStateChanged,signOut, sendPasswordResetEmail}from "firebase/auth";

import { auth } from '../firebase'
 


export const AuthContext=React.createContext();
  export function AuthProvider({children}){

    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
useEffect(()=>{
  onAuthStateChanged(auth, (user) => {
    if(user){
      setUser(user);
    }
    else{
      setUser('')
    }
  })
  setLoading(false);
},[])
   const signup=(email,password)=>{
   
 return  createUserWithEmailAndPassword(auth,email,password)
    }

  const login=(email,password)=>{
   
        return signInWithEmailAndPassword(auth,email,password)
         
    }

    function logout(){
        return signOut(auth);
    }
 function forgot(email){
  return sendPasswordResetEmail(auth,email);
 }

    useEffect(()=>{
     const unsub=auth.onAuthStateChanged((user)=>{
        setUser(user);
        setLoading(false);
     })

     return ()=>{
        unsub();
     }
    },[])

    const store={
        user,
        signup,
        login,
        logout,
        forgot
    }
    return(
        <AuthContext.Provider value={store}>
            {!loading && children}
        </AuthContext.Provider>
    )
  }