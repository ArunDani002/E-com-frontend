import { Grid } from '@mui/material'
import React, { useEffect } from 'react'

const MyProductListing = () => {

    useEffect(() => {
        // Fetch user's products from API and set state
        // Example: axios.get('/api/my-products').then(res => setProducts(res.data))
    }, [])

    const myProducts = ()=>{

    }

  return (
    <>
        <h1>My Product Listing</h1>
        <Grid container spacing={2}>
            {/* Example product card */}
            <Grid item xs={12} sm={6} md={4}>
                <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16 }}>
                    <h2>Product Name</h2>
                    <p>Price: $99.99</p>
                    <p>Description: This is a great product.</p>
                </div>
            </Grid>
        </Grid>
    </>
  )
}

export default MyProductListing