import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Login.css';
import insta from '../Assests/insta.png';
import icon from '../Assests/icon.png';
import TextField from '@mui/material/TextField';
import mobi from '../Assests/mobi.png';
import img1 from '../Assests/seen.png';
import  img2 from '../Assests/images.png';
import img3 from '../Assests/coffee.png';
import img4 from '../Assests/download.png';
import img5 from '../Assests/sky.png';
import {Link} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext,Image } from 'pure-react-carousel';
export default function Login() {
    const store=useContext(AuthContext);
    const navigate = useNavigate();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('');
    const [loading,setLoading]=useState(false);
  
    const {login,user,forgot}=useContext(AuthContext);
    const handleclick=async()=>{
     try{
      setLoading(true);
      setError('');
  await login(email,password);
  console.log("logedin sucessfully");
     }
     catch(err){
      console.log(err.message);
    setError("user account not exist please signup");
    setTimeout(()=>{
      setError('')
    },2000)
  
     }
     setLoading(false);
    }
  React.useEffect(()=>{
  if(user){
    navigate('/feed');
  }
  else{
    navigate('/')
    console.log("not logged in");
  }
  },[user])
    return (
  
  
     <div className='loginwraper' >
      
    <div className='imgcar' >
    <img src={mobi}alt=""></img>
      <div className='car'>
      <CarouselProvider
        visibleSlides={1}
    
          totalSlides={5}
          step={3}
          naturalSlideWidth={258}
          naturalSlideHeight={445}
          hasMasterSpinner
          isPlaying={true}
          infinite={true}
          dragEnabled={false}
          touchEnabled={false}
        >
          <Slider>
            <Slide index={0}><Image src={img1}/></Slide>
            <Slide index={1}><Image src={img2}/></Slide>
            <Slide index={2}><Image src={img3}/></Slide>
            <Slide index={3}><Image src={img4}/></Slide>
            <Slide index={4}><Image src={img5}/></Slide>
          </Slider>
        </CarouselProvider>
    
      </div>
    </div>
  
  
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
          
          </div>
          {error!='' && <Alert severity="error" style={{height:40}}>{error}</Alert>}
          <TextField  label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <TextField  label="Password" variant="outlined" fullWidth={true} margin="dense" size="small"  value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <Typography variant="body2" color="primary" style={{marginTop:2}}>
           <Link to="/forgot" style={{textDecoration:'none',margin:10,marginLeft:100}}>Forgot Password?</Link>
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant='contained' color="primary"  fullWidth={true} onClick={handleclick} disabled={loading}>Login</Button>
         
        </CardActions>
        
          <Typography variant="body2" color="text.secondary" style={{marginLeft:100}}>
           Don't have an account?<Link to="/signup" style={{textDecoration:'none',margin:10}}>Signup</Link>
          </Typography>
      </Card>
      
      </div>
    
  </div>
  
      
    );
  }
