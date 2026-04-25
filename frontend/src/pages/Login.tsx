import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const res = await API.post('/auth/login', {
        email,
        password
      });

      localStorage.setItem('token', res.data.token);

      navigate('/ideas');
    } catch (error: any) {
      console.error(error.response?.data);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/ideas');
  }, [navigate]);

  return (
    <main className="login-container">
      <h2>Login</h2>
      <form onSubmit={(e) =>{
        e.preventDefault();
        if (email && password)
          handleLogin();
      }}>
        <input 
          value={email}
          placeholder="Enter your email" 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input
          placeholder="Enter your password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

    </main>
  );
}