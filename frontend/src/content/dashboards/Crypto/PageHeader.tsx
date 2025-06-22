import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import PopupForm from 'src/components/Forms/PopupForm';
import {toast} from "react-toastify";
import { getUserInfo } from 'src/services/auth';
import { useNavigate } from 'react-router';
interface User {
  firstname?:string,
}
import { useAuth } from 'src/contexts/AuthContext';

function PageHeader() {
  const [isPopupOpen, setIsPopupOpen]=useState(false);
  const theme = useTheme();
  const [name, setName] = useState();
  const {user, loading} = useAuth();
  const navigate = useNavigate();
  useEffect(()=> {
    if(loading) return;
    const fetchUser= async()=> {
      const user_id = localStorage.getItem('user_id');
      if(!user_id ) {
        return;
      }
      else if(!user) {
        return;
      }
      const response = await getUserInfo(user_id) 
    
      if(response?.success) {
        setName(response.user?.first_name || response.user?.name);
        return;
      }
      else {
        toast.error('Some error occured while fetching your info');
      }
      
    }
    fetchUser()
  },[loading, user]);
  const handleClick = () => {
    if(!user) {
      toast.error('Please login to use this feature');
      return;
    }
    navigate('/upload-tax-docs')

  }


  return (
    <>
      <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8)
          }}
          variant="rounded"
          alt={name}
          src="https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg?semt=ais_hybrid&w=740"
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Welcome, {name}!
        </Typography>
        <Typography variant="subtitle2">
          Today is a good day to start trading crypto assets!
        </Typography>
       
      </Grid>
     <button style={{ marginLeft:"100px", height:'40px', backgroundColor:'#5c6ac0', border:'0', borderRadius:'8px', color:'white', cursor:'pointer'}} onClick={handleClick}>
          Upload a new Document
        </button>
    </Grid>
    {isPopupOpen && <PopupForm isOpen = {isPopupOpen} onClose={()=>setIsPopupOpen(false)} />}
    </>
  );
}

export default PageHeader;
