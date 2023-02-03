import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import insta from '../Assests/insta.png';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import { useContext } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import './ResponsiveAppBar.css'
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile',  'Logout'];
export default function ResponsiveAppBar({ postData,userData}) {
  const {logout}=useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
const handlelogout=async()=>{
  await logout();
  navigate('/');
}
  return (
    <AppBar position="static" style={{backgroundColor:'#fff',display:'flex',paddingLeft:10,paddingRight:10}}>
      <Container maxWidth="xl" class>
        <Toolbar disableGutters>
          
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            style={{marginLeft:90}}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
           <img style={{height:55,width:200}}src={insta}className='image'></img>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
              
           
          </Box>

          <Box sx={{ flexGrow: 0 }} className="nav-container">
            <HomeIcon fontSize='large' className="nav-icons"/>
            <ExploreIcon fontSize='large'className="nav-icons"/>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={userData?.photoURL} style={{height:"2rem",width:"2rem",borderRadius:"50%"}} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
               <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center"><Link to="/profile" style={{textDecoration:'none',color:'black'}}>Profile</Link></Typography>
                </MenuItem>
                <MenuItem  onClick={()=>{
                  handlelogout();
                  handleCloseUserMenu()}}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}