import { Box, Typography } from '@mui/material'
import React from 'react'

const HeaderNavbar = () => {
    return (
        <>
            <Box sx={{
                height: '60px',
                width: '100%',
                backgroundColor: '#1976d2',
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Typography sx={{
                            color: '#ffffff',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            lineHeight: '60px',
                            paddingLeft: '20px',
                        }}>
                            Take!t
                        </Typography>
                        <Box ml={2}>
                            <Typography sx={{
                                color: '#ffffff',
                                fontSize: '14px',
                            }}
                            >
                                Electronics
                            </Typography>
                        </Box>
                        <Box ml={2}>
                            <Typography sx={{
                                color: '#ffffff',
                                fontSize: '14px',
                            }}
                            >
                                Gadgets
                            </Typography>
                        </Box><Box ml={2}>
                            <Typography sx={{
                                color: '#ffffff',
                                fontSize: '14px',
                            }}
                            >
                                Accessories
                            </Typography>
                        </Box><Box ml={2}>
                            <Typography sx={{
                                color: '#ffffff',
                                fontSize: '14px',
                            }}
                            >
                                Garments
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#ffffff',
                        marginRight: '20px',

                    }}>
                        <Typography sx={{
                            color: '#1976d2',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            lineHeight: '40px',
                        }}>A</Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default HeaderNavbar