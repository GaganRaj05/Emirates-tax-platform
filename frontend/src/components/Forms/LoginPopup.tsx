import React, { useState } from 'react';
import './LoginPopup.css';
import { toast } from 'react-toastify';
import { useAuth } from 'src/contexts/AuthContext';
import { userLogin } from 'src/services/auth';

interface LoginPopupProps {
  onClose: () => void;
  onSignupClick?:()=>void
}


const LoginPopup: React.FC<LoginPopupProps> = ({  onClose, onSignupClick  }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth(); 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('form submitted')

    try {
      const response = await userLogin({ email, password });
      
      if (response?.error?.msg) {
        toast.error(response.error.msg);
        return;
      }
      
      if (response?.success && response.userData) {
        toast.success('Login successful');
        localStorage.setItem('role', response.userData.role);
        localStorage.setItem('user_id', response.userData.id);
        setUser(response.userData);
        onClose();
        window.location.reload(); 
      } else {
        toast.error('An unknown error occurred. Please try again later.');
      }
    } catch (error) {
      toast.error('Network error. Please try again later.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleClick = (e:React.FormEvent) => {
    e.preventDefault();
    onSignupClick();
  }


return (
  <>

      <div className="login-overlay">
        <div className="login-popup fade-in">
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
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

            <p>
              Don’t have an account yet?{' '}
              <a href="#" onClick={handleClick}>
                Create one
              </a>
            </p>

            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>

  </>
);
};

export default LoginPopup;