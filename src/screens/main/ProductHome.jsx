import { Box, Grid, Card, CardContent, CardMedia, Typography, Rating, Button, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderNavbar from '../NavBars/HeaderNavbar'
import SearchAndFilter from './SearchAndFilter'
import { ProductDetail } from './ProductDetail'
import ModelReusable from '../reusable/ModelReusable'
import axios from 'axios'
import { API } from '../../Api'


export default function ProductHome() {
    // initialize from the real product list
    const [products, setProducts] = useState([])
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)
    const [filteredProducts, setFilteredProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [detailOpen, setDetailOpen] = useState(false)
    const [showLoginPrompt, setShowLoginPrompt] = useState(false)

    const navigate = useNavigate()

    const openDetail = (product) => {
        setSelectedProduct(product)
        setDetailOpen(true)
    }

    useEffect(() => {
        getAllProducts();
    }, [])

    const getAllProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await axios.get(API + "/api/products");

            setProducts(res.data);
            setFilteredProducts(res.data);
        } catch (err) {
            console.error(err);
            setError(
                err?.response?.data?.message ||
                "Something went wrong. Please try again later."
            );
        } finally {
            setLoading(false);
        }
    };



    const closeDetail = () => {
        setDetailOpen(false)
        // optionally: setSelectedProduct(null)
    }

    const handleAddToCart = async (product, qty = 1) => {
        try {
            await axios.post(
                API + "/api/cart",
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
        const token = localStorage.getItem('token')

        if (!token) {
            setShowLoginPrompt(true)
            return
        }

        // TODO: start checkout flow
        setDetailOpen(false)
    }

    console.log(products, 'products')

    return (
        <React.Fragment>
            <Box sx={{ p: 2 }}>
                {/* pass the real products and get filtered results via setter */}
                <SearchAndFilter products={products} onFiltered={setFilteredProducts} />

                <Box sx={{ padding: 4 }}>
                    {loading ? (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                minHeight: "300px",
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                minHeight: "300px",
                                textAlign: "center",
                            }}
                        >
                            <Typography variant="h1">
                                😔
                            </Typography>

                            <Typography
                                variant="h5"
                                sx={{ mt: 2, fontWeight: 600 }}
                            >
                                Oops! Unable to load products
                            </Typography>

                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ mt: 1 }}
                            >
                                {error}
                            </Typography>

                            <Button
                                variant="contained"
                                sx={{ mt: 3 }}
                                onClick={getAllProducts}
                            >
                                Try Again
                            </Button>
                        </Box>
                    ) : (
                        <Grid container spacing={3}>
                            {filteredProducts.map((item) => (
                                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.id}>
                                    <Grid item xs={12} sm={6} md={3} key={item.id}>
                                        <Card
                                            sx={{ borderRadius: 3, boxShadow: 3, cursor: 'pointer' }}
                                            onClick={() => openDetail(item)}
                                        >
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

                                                <Rating
                                                    value={item.productRating || 0}
                                                    precision={0.5}
                                                    readOnly
                                                    sx={{ mt: 1 }}
                                                />

                                                <Typography variant="h6" sx={{ mt: 1 }}>
                                                    ₹{item.productPrice}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Box>
            </Box>

            <ProductDetail
                open={detailOpen}
                product={selectedProduct}
                onClose={closeDetail}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
            />

            <ModelReusable
                open={showLoginPrompt}
                onClose={() => setShowLoginPrompt(false)}
                title="Login Required"
            >
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        You need to be logged in to buy a product. Please login to continue.
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Button onClick={() => setShowLoginPrompt(false)}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setShowLoginPrompt(false)
                            navigate('/login')
                        }}
                    >
                        Login
                    </Button>
                </Box>
            </ModelReusable>
        </React.Fragment>
    )
}
