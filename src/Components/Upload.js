
import { useState } from 'react';
import Button from '@mui/material/Button';
import MovieIcon from '@mui/icons-material/Movie';
import { LinearProgress } from '@mui/material';
import {v4 as uuidv4} from 'uuid'
import {
 
  arrayUnion,
 
  doc,
  serverTimestamp,
  setDoc,
  updateDoc
} from "firebase/firestore";
import { auth,db,storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function Upload({userData}) {

 
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState('');
    const [progress,setProgress]=useState('')

    const handleImageChange = (e) => {
    
      const file=e.target.files[0] ;
      if(file==null){
        setError('please upload profile pic');
        setTimeout(()=>{
          setError('')
        },2000)
        return;
      }
      
      let uid=uuidv4();
      setLoading(true);
      const user = auth.currentUser;
      const storageRef = ref(storage, `${userData.uid}/posts/${uid}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed', 
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(prog);
          console.log('Upload is ' + prog + '% done');
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        }, 
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
          
            
            let obj={
              likes:[],
              postId:uid,
              postUrl:downloadURL,
              profileName:userData.name,
              profileUrl:userData.photoURL,
              uid:userData.uid,
              timestamp:serverTimestamp()
  
            }
            console.log(obj);
         setDoc(doc(db,"posts",uid),obj)
         console.log("post aaded");
       /* updateDoc(doc,(db,"users",userData.uid),{
        posts:arrayUnion(userData.uid)
         })*/
  handledoc();
         
          });
          setLoading(false)
        }
      );
      
      
      
    }  
     
   const handledoc=async()=>{
    const washingtonRef = doc(db, "users", userData.uid);

// Atomically add a new region to the "regions" array field.
await updateDoc(washingtonRef, {
  posts:arrayUnion(userData.uid)


});

console.log('updated')

   }
      
  return (
    <div>
        <Button size="small" variant='outlined' fullWidth={true} color="secondary" disabled={loading} startIcon={<MovieIcon/>} style={{marginTop:15,height:40,width:180}} component="label">Upload 
        <input type="file" accept="video/*" hidden onChange={handleImageChange}/>
        </Button>
        {  loading && <LinearProgress variant="determinate" value={progress} style={{marginTop:'0.2rem'}}/>}
    </div>
  );
}
