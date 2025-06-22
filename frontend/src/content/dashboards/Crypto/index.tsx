// DashboardCrypto.tsx
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import { useAuth } from 'src/contexts/AuthContext';
import AccountBalance from './AccountBalance';
import Wallets from './Wallets';
import AccountSecurity from './AccountSecurity';
import WatchList from './WatchList';
import LoginPopup from 'src/components/Forms/LoginPopup';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SignupPopup from 'src/components/Forms/SignupPopup';
import 'react-toastify/dist/ReactToastify.css';

function DashboardCrypto() {
  const { user, loading } = useAuth();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isSignUpOpen, setIsSignupOpen] = useState(false);
  useEffect(() => {
    if (loading) return;
    if (!user ) {
      setIsLoginPopupOpen(true);
    }
  }, [loading, user]); 


  return (
    <>
      <Helmet>
        <title>Crypto Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <AccountBalance />
          </Grid>
          <Grid item lg={8} xs={12}>
            <Wallets />
          </Grid>
          <Grid item lg={4} xs={12}>
            <AccountSecurity />
          </Grid>
          <Grid item xs={12}>
            <WatchList />
          </Grid>
        </Grid>
      </Container>
      <Footer />
      {isLoginPopupOpen && 
        <LoginPopup 
          onClose={() => setIsLoginPopupOpen(false)}
          onSignupClick={()=>{setIsLoginPopupOpen(false); setIsSignupOpen(true)}}
        />
      }
      {
        isSignUpOpen && 
        <SignupPopup onClose={()=>setIsSignupOpen(false)} onLoginClick={()=>{setIsSignupOpen(false); setIsLoginPopupOpen(true)}} />
      }
      
          </>
  );
}

export default DashboardCrypto;