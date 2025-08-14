import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';

export default function PasswordResetConfirmPage() {
  const { uid, token } = useParams();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      alert('Passwords do not match');
      return;
    }
    await api.post(`auth/password-reset/${uid}/${token}/`, {
      new_password1: password,
      new_password2: confirm,
    });
    setDone(true);
  };

  if (done) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Typography>Password reset successful. You may now <Link to="/login">login</Link>.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4">Set New Password</Typography>
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <TextField label="Confirm Password" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        <Button type="submit" variant="contained">
          Reset Password
        </Button>
      </Box>
    </Container>
  );
}
