import { Box, Button, Card, Input } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Signin = () => {


    useEffect(() => {
        // fetch real products from API if needed
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/productlisting");
        }
    })

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const submit = () => {
        if (formData.username == "" || formData.password == "") {
            toast.warning("All fields are required");
        }

        try {
            axios.post("http://localhost:8080/api/auth/login", formData)
                .then(res => {
                    console.log("Login Successful: ", res.data);
                    if (res?.data?.success === true) {
                        toast.success("Login Successful");
                        console.log("Login Successful: ", res);
                        localStorage.setItem("token", res.data.token);
                        localStorage.setItem("role", res.data.role);
                        localStorage.setItem("uid", res.data.uuid);
                        localStorage.setItem("userName", res.data.firstName);
                        // console.log("Login Successful: ", res.data);

                        // localStorage.setItem("user", JSON.stringify(res.data.user));
                        navigate("/");
                    }
                }).catch(err => {
                    toast.error(err.response?.data?.message);
                })

        } catch (error) {
            console.log("Login Failed: ", error);
        }

        setFormData({
            username: '',
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
                        <Input placeholder='Username' name='username' value={formData.username} onChange={handleChange} />
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