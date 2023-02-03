import * as React from 'react';
import { useState,useContext,useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Signup.css';

import insta from '../Assests/insta.png';
import icon from '../Assests/icon.png';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {Link,useNavigate} from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc
} from "firebase/firestore";
import { auth,db,storage } from '../firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


export default function Signup() {
    const navigate = useNavigate();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [name,setName]=useState('');
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState(null);
    const [error,setError]=useState('');
    const [loading,setLoading]=useState();
  
    const {signup,user}=useContext(AuthContext);
    const handleImageChange = (e) => {
      if (e.target.files[0]) {
        setFile(e.target.files[0]);
      }
    };
    const handleclick=async() =>{
     {/* if(file==null){
        setError('please upload profile pic');
        setTimeout(()=>{
          setError('')
        },2000)
        return;
      }*/}
      try{
        
        setLoading(true)
        setError('')
      let userObj  = await signup(email,password);
     
      const user = auth.currentUser;
   
      const storageRef = ref(storage, `${user.uid}/Profile.jpg`);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed', 
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
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
            const user = auth.currentUser;
            
            let obj={
              name:name,
              email:email,
            uid:user.uid,
              photoURL:downloadURL,
              posts:[]
  
            }
         setDoc(doc(db,"users",user.uid),obj)
         console.log("doc aaded");
          });
        }
      );
      
     
           //setUrl(url);
      
     
   } catch(err){
        setError(err);
        setTimeout(()=>{
          setError('')
        },2000)
      
      }
     
      setLoading(false);
    }
  
      
      
    return (
  
     <div className='signupwraper'>
      <div className='signupCard'>
      <Card variant='outlined'>
        <div className='insta-logo'>
          <img src={insta} alt=""></img>
        </div>
        <div className='img2'>
          <img src={icon} alt="" style={{height:50,marginLeft:165}}></img>
    
          </div>
  
        <CardContent>
          <div className='text1'>
          <Typography  variant="subtitle1" style={{textAlign:'center'}} >
          Signup to see photos and videos from your freinds.
          </Typography>
          </div>
          {error!='' && <Alert severity="error" style={{height:40}}>{error}</Alert>}
          <TextField  label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <TextField  label="Password" variant="outlined" fullWidth={true} margin="dense" size="small" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <TextField  label="Name" variant="outlined" fullWidth={true} margin="dense" size="small" value={name} onChange={(e)=>setName(e.target.value)}/>
          <Button size="small" variant='outlined' fullWidth={true} color="secondary" startIcon={<CloudUploadIcon/>} style={{marginTop:5}} component="label">Upload Profile image
          <input type="file" accept="images/*" hidden onChange={handleImageChange}/>
          </Button>
          
        </CardContent>
        <CardActions>
          <Button size="small" variant='contained' color="primary"  fullWidth={true}  onClick={handleclick}>Sign Up</Button>
         
        </CardActions>
        <Typography variant="body2" color="text.secondary" style={{marginLeft:40}}>
            By signing you agree to Terms & conditions policy.
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{marginLeft:100}}>
           Having an account?<Link to="/" style={{textDecoration:'none',margin:10}}>Login</Link>
          </Typography>
      </Card>
      
      </div>
     </div>
  
  
  
      
    );
  }