import React, { useState } from 'react';
import './LoginPopup.css';
import { toast } from 'react-toastify';
import { useAuth } from 'src/contexts/AuthContext';
import { userSignup } from 'src/services/auth';
interface SignupPopupProps {
  onClose: () => void;
  onLoginClick?: () => void;
}

const SignupPopup: React.FC<SignupPopupProps> = ({ onClose, onLoginClick }) => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await userSignup({
        first_name,
        last_name,
        email,
        phone,
        password
      });

      if (response?.error?.msg) {
        toast.error(response.error.msg);
        return;
      }

      if (response?.success) {
        toast.success('Signup successful');
        onLoginClick();
      } else {
        toast.error('Signup failed. Please try again.');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-popup fade-in">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input
              type="text"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>

          <label>
            Last Name:
            <input
              type="text"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>

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
            Phone:
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
            Already have an account?{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); onLoginClick?.(); }}>
              Login here
            </a>
          </p>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPopup;
