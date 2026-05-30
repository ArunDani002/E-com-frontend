// SellProductForm.jsx
import React, { useState } from 'react'
import { Box, TextField, Button, MenuItem, Typography, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
// import { useProducts } from './ProductContext'

const categories = ['Audio', 'Wearables', 'Cameras', 'Peripherals', 'Accessories', 'Garments', 'Other']

export default function SellProductForm() {
  const navigate = useNavigate()
//   const { addProduct } = useProducts()
  const [form, setForm] = useState({
    productName: '',
    productPrice: '',
    rating: '',
    productCategory: '',
    productDescription: '',
    productImageUrl: ''
  })
  const [saving, setSaving] = useState(false)

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSaving(true)

    // simple validation
    if (!form.productName || !form.productPrice) {
      alert('Please provide product name and price.')
      setSaving(false)
      return
    }

    try {
      axios.post('http://localhost:8080/api/products',form)
      .then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })
    } catch (error) {
      
    }

    // create product in context
    // addProduct(form)
    console.log(form)


    // optional: show a toast here
    setSaving(false)
    navigate('/') // go back to product list
  }

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Sell a Product
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Product Name"
            name="productName"
            value={form.productName}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />

          <TextField
            label="Price (₹)"
            name="productPrice"
            type="number"
            value={form.productPrice}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />

          <TextField
            label="Rating (0-5)"
            name="rating"
            type="number"
            inputProps={{ min: 0, max: 5, step: 0.1 }}
            value={form.rating}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            select
            label="Category"
            name="productCategory"
            value={form.productCategory}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          >
            {categories.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Image URL"
            name="productImageUrl"
            value={form.productImageUrl}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            label="Short Description"
            name="productDescription"
            value={form.productDescription}
            onChange={handleChange}
            fullWidth
            multiline
            minRows={3}
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button type="submit" variant="contained" disabled={saving}>
              {saving ? 'Saving…' : 'Add Product'}
            </Button>

            <Button variant="outlined" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  )
}
