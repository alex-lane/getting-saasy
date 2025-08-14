import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../auth';

export default function ProfilePage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    if (!auth.token) {
      navigate('/login');
    } else if (auth.user) {
      setEmail(auth.user.email || '');
      setFirstName(auth.user.first_name || '');
      setLastName(auth.user.last_name || '');
    }
  }, [auth, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await api.put('user/profile/', {
      email,
      first_name: firstName,
      last_name: lastName,
    });
    auth.refreshUser();
    setEmail(res.data.email);
    setFirstName(res.data.first_name);
    setLastName(res.data.last_name);
  };

  const handleLogout = () => {
    auth.logout();
    navigate('/login');
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4">Profile</Typography>
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <TextField label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <Button type="submit" variant="contained">
          Save
        </Button>
        <Button onClick={handleLogout}>Logout</Button>
      </Box>
    </Container>
  );
}
