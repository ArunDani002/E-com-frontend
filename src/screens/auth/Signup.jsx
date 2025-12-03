import { Box, Button, Card, Input, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        dob: "",
    })

    const submit = () => {
        console.log("User Data: ", userData);
        setUserData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            dob: "",
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
                    height: '300px',
                }}>
                    <Typography>Sign Up</Typography>
                    <Box>
                        <Box>
                            <Input placeholder='Name' name='name' value={userData.name} onChange={handleChange} />
                        </Box>
                        <Box>
                            <Input placeholder='Email Id' name='email' value={userData.email} onChange={handleChange} />
                        </Box>
                        <Box>
                            <Input placeholder='Password' name='password' value={userData.password} onChange={handleChange} />
                        </Box>
                        <Box>
                            <Input placeholder='Confirm Password' name='confirmPassword' value={userData.confirmPassword} onChange={handleChange} />
                        </Box>
                        <Box>
                            <Input placeholder='Date of Birth' name='dob' type='date' value={userData.dob} onChange={handleChange} />
                        </Box>
                    </Box>
                    <Button variant='contained' sx={{ marginTop: '20px' }} onClick={() => { submit() }}>
                        Register
                    </Button>

                    <Box>
                        Have Account Already? <Button onClick={() => navigate("/")}>Signin</Button>
                    </Box>
                </Card>
            </Box>
        </React.Fragment>
    )
}

export default Signup




