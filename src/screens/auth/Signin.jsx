import { Box, Button, Card, Input } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const submit = () => {
        console.log("Form Data: ", formData);
        if (formData.email && formData.password) {
            navigate("/productlisting");
        }
        setFormData({
            email: '',
            password: '',
        })
    }

    return (
        <React.Fragment>
            <Box sx={{
                display: 'flex',
                height: '100vh',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Card sx={{
                    width: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '300px',
                }}>
                    <Box textAlign="center" sx={{ margin: '10px', bgcolor: 'yellow' }}>Sign in</Box>
                    <Box>
                        <Input placeholder='Email Id' name='email' value={formData.email} onChange={handleChange} />
                    </Box>
                    <Box>
                        <Input placeholder='Password' name='password' value={formData.password} onChange={handleChange} />
                    </Box>
                    <Button variant='contained' sx={{ marginTop: '20px' }} onClick={() => { submit() }}>
                        Login
                    </Button>

                    <Box>
                        Don't Have Account ? <Button onClick={() => navigate("/signup")}>Signup</Button>
                    </Box>
                </Card>
            </Box>

        </React.Fragment>
    )
}

export default Signin