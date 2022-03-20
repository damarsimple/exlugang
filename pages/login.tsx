import {
    Box,
    Avatar,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Grid,
} from '@mui/material'
import Link from 'next/link'
import React from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useUserStore } from '../stores/useUserStore'
import { useRouter } from 'next/router';
export default function Login() {

    const { setToken} = useUserStore()
    const { push } = useRouter()
    const handleSubmit = (e: any) => {
        e.preventDefault()
        const data = new FormData(e.target)

        const token = data.get("token");
        setToken(token);
     

        push("/")



    }

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="token"
                    label="TOKEN"
                    name="token"
                    autoComplete="token"
                    autoFocus
                />
              
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
