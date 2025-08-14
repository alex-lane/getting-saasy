import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await auth.login(username, password);
      navigate('/profile');
    } catch {
      alert('Login failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4" align="center">
          Login
        </Typography>
        <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit" variant="contained">
          Login
        </Button>
        <Button component={Link} to="/reset-password">
          Forgot password?
        </Button>
      </Box>
    </Container>
  );
}
