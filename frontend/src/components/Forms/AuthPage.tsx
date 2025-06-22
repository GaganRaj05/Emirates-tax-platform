import React, { useState } from 'react';
import './AuthPage.css';
import { adminLogin, consultantSignIn } from 'src/services/auth';
import { useAuth } from 'src/contexts/AuthContext';
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router';
import { ClipLoader } from 'react-spinners';

const AuthPage: React.FC = () => {
  const [role, setRole] = useState<'admin' | 'consultant'>('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {user, setUser} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate= useNavigate()
  const handleToggle = () => {
    setRole((prev) => (prev === 'admin' ? 'consultant' : 'admin'));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = {email, password};
    if(role === "admin") {
      const response = await adminLogin(formData);
      if(response?.success) {
        localStorage.setItem('role', 'admin');
        localStorage.setItem('user_id',response.userData.id);
        setUser(response.userData);
        toast.success('Login sucessfull');
        navigate('/management/transactions')
      }
      else if(response?.error?.msg) {
        toast.error(response.error.msg);
      }
      else {
        toast.error("An unknown network error has occured please try again later");
      }
    }
    else {
            const response = await consultantSignIn(formData);
      if(response?.success) {
        localStorage.setItem('role', 'consultant');
        setUser(response.userData);
        toast.success('Login sucessfull');
        localStorage.setItem('user_id',response.userData.id);
        navigate('/management/transactions')
      }
      else if(response?.error?.msg) {
        toast.error(response.error.msg);
      }
      else {
        toast.error("An unknown network error has occured please try again later");
      }

    }
    setIsLoading(false);

  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{role === 'admin' ? 'Admin Login' : 'Consultant Login'}</h2>

        <div className="toggle-container">
          <span>Admin</span>
          <label className="switch">
            <input type="checkbox" onChange={handleToggle} checked={role === 'consultant'} />
            <span className="slider round"></span>
          </label>
          <span>Consultant</span>
        </div>

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit" disabled={isLoading}>{isLoading ? <ClipLoader/>:'Login'}</button>
      </form>
    </div>
  );
};

export default AuthPage;
