import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { FormEvent, useState } from 'react';
import api from '../api';

export default function PasswordResetRequestPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await api.post('auth/password-reset/', { email });
    setSent(true);
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4">Reset Password</Typography>
        {sent ? (
          <Typography>If the email exists, a reset link was sent.</Typography>
        ) : (
          <>
            <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Button type="submit" variant="contained">
              Send Reset Link
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
}
