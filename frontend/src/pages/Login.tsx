import { useState } from "react";
import API from "../api/axios";


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    try {
      const res = await API.post('/auth/login', {
        email,
        password
      });

      localStorage.setItem('token', res.data.token);

      alert('Login successful');
    } catch (error: any) {
      console.error(error.response?.data);
    }
  }

  return (
    <form action="/ideas">
      <h2>Login</h2>
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
      <button type="submit" onClick={handleLogin}>Login</button>
    </form>
  );
}