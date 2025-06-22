import { Typography, Button, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { getUserInfo } from 'src/services/auth';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import {toast} from "react-toastify";
import { useAuth } from 'src/contexts/AuthContext';
function PageHeader() {
    const [name, setName] = useState<String>();
    const {user, loading} = useAuth();

    useEffect(()=> {
      if(loading) return;
      if(!user) {
        return;
      }
      setName(user.name);
      console.log("this",user)
    },[loading, user]);
  
  

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Transactions
        </Typography>
        <Typography variant="subtitle2">
          {name}, You will find document up for review here
        </Typography>
      </Grid>
      <Grid item>
        
      </Grid>
    </Grid>
  );
}

export default PageHeader;
