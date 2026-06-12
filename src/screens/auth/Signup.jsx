import { Box, Button, Card, Input, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../../Api';

const Signup = () => {

    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        address: "",
        city: "",
        country: "",
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        phone: "",
        state: ""
    })

    const submit = () => {
        if (userData.firstName === "" || userData.lastName === "" || userData.email === "" || userData.password === "" || userData.confirmPassword === "" || userData.dob === "") {
            toast.warning("All fields are required");
            return;
        }

        try {
            axios.post(API + "/api/users", userData)
                .then(res => {
                    toast.success("Registration Successful");
                    navigate("/login");
                });
        } catch (error) {
            console.error("Registration Failed: ", error);
            toast.error("Registration Failed");
        }

        setUserData({
            address: "",
            city: "",
            country: "",
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword:"",
            phone: "",
            state: ""
        })
    }

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
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
                }}>
                    <Typography>Sign Up</Typography>
                    <Box>
                        <Box>
                            <Input placeholder='First Name' name='firstName' value={userData.firstName} onChange={handleChange} />
                        </Box>
                        <Box>
                            <Input placeholder='Last Name' name='lastName' value={userData.lastName} onChange={handleChange} />
                        </Box>
                        <Box>
                            <Input placeholder='address' name='address' value={userData.address} onChange={handleChange} />
                        </Box>
                        <Box>
                            <Input placeholder='city' name='city' value={userData.city} onChange={handleChange} />
                        </Box>
                        <Box>
                            <Input placeholder='country' name='country' value={userData.country} onChange={handleChange} />
                        </Box>
                        <Box>
                            <Input placeholder='Email Id' name='email' value={userData.email} onChange={handleChange} />
                        </Box>
                        <Box>
                            <Input placeholder='phone' name='phone' value={userData.phone} onChange={handleChange} />
                        </Box>
                        <Box>
                            <Input placeholder='state' name='state' value={userData.state} onChange={handleChange} />
                        </Box>
                        <Box>
                            <Input placeholder='Password' name='password' value={userData.password} onChange={handleChange} />
                        </Box>
                        <Box>
                            <Input placeholder='Confirm Password' name='confirmPassword' value={userData.confirmPassword} onChange={handleChange} />
                        </Box>

                    </Box>
                    <Button variant='contained' sx={{ marginTop: '20px' }} onClick={() => { submit() }}>
                        Register
                    </Button>

                    <Box>
                        Have Account Already? <Button onClick={() => navigate("/login")}>Signin</Button>
                    </Box>
                </Card>
            </Box>
        </React.Fragment>
    )
}

export default Signup




