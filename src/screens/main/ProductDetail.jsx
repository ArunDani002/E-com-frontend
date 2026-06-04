import React, { useState } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Stack
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import HeaderNavbar from '../NavBars/HeaderNavbar'
import SearchAndFilter from './SearchAndFilter'

/*
This file contains:
- ProductDetail: a reusable product detail dialog component
- ProductHome: example page that uses ProductDetail and opens it on card click

USAGE:
- Import ProductHome into your routes or App and render it.
- ProductDetail props:
  - open: boolean
  - product: object (id, name, price, rating, description, image)
  - onClose: () => void
  - onAddToCart: (product, qty) => void
  - onBuyNow: (product) => void

The ProductHome demonstrates how to open the detail dialog when clicking a card.
*/

// ----------------- ProductDetail (reusable) -----------------
export function ProductDetail({ open, product, onClose, onAddToCart, onBuyNow }) {
  if (!product) return null

  const handleAddToCart = async() => {
    try {
      await onAddToCart(product, 1) // example with qty 1
    } catch (error) {
      alert('Failed to add to cart.')
    }
  }

  const handleBuyNow = () => {
    if (onBuyNow) onBuyNow(product)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6">{product.productName}</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5}>
            <CardMedia component="img" height="250" image={product.productImageUrl} alt={product.productImageUrl} sx={{ borderRadius: 1 }} />
          </Grid>

          <Grid item xs={12} sm={7}>
            <Typography variant="subtitle1" color="text.secondary">
              {product.productCategory}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
              <Rating value={product.productRating} precision={0.5} readOnly />
              <Typography variant="body2">{product.productRating}</Typography>
            </Stack>

            <Typography variant="h5" sx={{ mt: 2 }}>
              ₹{product.productPrice}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              {product.productDescription}
            </Typography>

            {/* Example small meta or features list could go here */}
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button variant="outlined" onClick={handleAddToCart}>
          Add to Cart
        </Button>

        <Button variant="contained" onClick={handleBuyNow}>
          Buy Now
        </Button>
      </DialogActions>
    </Dialog>
  )
}
