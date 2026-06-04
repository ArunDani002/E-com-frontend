import { Box, Grid, Card, CardContent, CardMedia, Typography, Rating } from '@mui/material'
import React, { useEffect, useState } from 'react'
import HeaderNavbar from '../NavBars/HeaderNavbar'
import SearchAndFilter from './SearchAndFilter'
import { ProductDetail } from './ProductDetail'
import axios from 'axios'

// renamed to avoid shadowing with state variable
const initialProducts = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 2999,
        rating: 4.5,
        description: "High-quality wireless sound with noise cancellation.",
        image: "https://via.placeholder.com/300x200",
        category: "Audio"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 4999,
        rating: 4.0,
        description: "Track your fitness and stay connected on the go.",
        image: "https://via.placeholder.com/300x200",
        category: "Wearables"
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        price: 1999,
        rating: 4.2,
        description: "Portable speaker with deep bass and long battery life.",
        image: "https://via.placeholder.com/300x200",
        category: "Audio"
    },
    {
        id: 4,
        name: "Smart Watch",
        price: 4999,
        rating: 4.0,
        description: "Track your fitness and stay connected on the go.",
        image: "https://via.placeholder.com/300x200",
        category: "Wearables"
    },
    {
        id: 5,
        name: "Bluetooth Speaker",
        price: 1999,
        rating: 4.2,
        description: "Portable speaker with deep bass and long battery life.",
        image: "https://via.placeholder.com/300x200",
        category: "Audio"
    }
]




export default function ProductHome() {
    // initialize from the real product list
    const [products, setProducts] = useState(initialProducts)
    const [filteredProducts, setFilteredProducts] = useState(initialProducts)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [detailOpen, setDetailOpen] = useState(false)

    const openDetail = (product) => {
        setSelectedProduct(product)
        setDetailOpen(true)
    }

    useEffect(() => {
        getAllProducts();
    }, [])

    const getAllProducts = () => {
        try {
            axios.get('http://localhost:8080/api/products')
                .then((res) => {
                    // console.log(res.data)
                    setProducts(res.data)
                    setFilteredProducts(res.data)
                }).catch((err) => {
                    console.log(err)
                })
        } catch (error) {
            console.log(error)
        }
    }



    const closeDetail = () => {
        setDetailOpen(false)
        // optionally: setSelectedProduct(null)
    }

    const handleAddToCart = async (product, qty = 1) => {
        try {
            await axios.post(
                "http://localhost:8080/api/cart",
                {
                    productId: product.id,
                    quantity: qty
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            alert("Added to cart!");
        } catch (error) {
            console.log(error);
            alert("Failed to add to cart.");
        }

        setDetailOpen(false);
    };

    const handleBuyNow = (product) => {
        // TODO: start checkout flow
        // console.log('Buy now', product)
        setDetailOpen(false)
    }

    return (
        <React.Fragment>
            <Box sx={{ p: 2 }}>
                {/* pass the real products and get filtered results via setter */}
                <SearchAndFilter products={products} onFiltered={setFilteredProducts} />

                <Box sx={{ padding: 4 }}>
                    <Grid container spacing={3}>
                        {filteredProducts.map((item) => (
                            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.id}>
                                <Card
                                    sx={{ borderRadius: 3, boxShadow: 3, cursor: 'pointer' }}
                                    onClick={() => openDetail(item)}
                                >
                                    {/* <CardMedia component="img" height="180" image={item.image} alt={item.name} /> */}
                                    <CardMedia
                                        component="img"
                                        height="180"
                                        image={item.productImageUrl}
                                        alt={item.productName}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" fontWeight="bold">
                                            {item.productName}
                                        </Typography>

                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            {item.productDescription}
                                        </Typography>

                                        <Rating name="read-only" value={item.productRating} precision={0.5} readOnly sx={{ mt: 1 }} />

                                        <Typography variant="h6" sx={{ mt: 1 }}>
                                            ₹{item.productPrice}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>

            <ProductDetail
                open={detailOpen}
                product={selectedProduct}
                onClose={closeDetail}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
            />
        </React.Fragment>
    )
}
