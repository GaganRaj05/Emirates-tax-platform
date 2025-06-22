import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getUserInfo } from 'src/services/auth';
import { useAuth } from 'src/contexts/AuthContext';

interface User {
  first_name?:string,
  id?:string,
  email?:string,
  phone?:string
}
function PageHeader() {
  const [userData, setUserData] = useState<User>({});
  const {user, loading} = useAuth();

  useEffect(()=> {
    if(loading) return;
    const fetchUser = async ()=> {
      if(!localStorage.getItem('user_id') || !user )  {
        toast.error('Please login to access your dashboard');
        return;
      }
      const response = await getUserInfo(localStorage.getItem('user_id'));
      console.log("this", response);
      if(response?.success) {
        setUserData(response.user);
      }
      else {
        toast.error('Some error occured fetching your info, Please try again later');
      }
    }
    fetchUser()
  },[loading, user]);

  return (
    <>
      <Typography variant="h3" component="h3" gutterBottom>
        User Settings
      </Typography>
      <Typography variant="subtitle2">
        {userData?.first_name},You can manage your account here.
      </Typography>
    </>
  );
}

export default PageHeader;
