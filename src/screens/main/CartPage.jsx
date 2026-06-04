import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  IconButton,
  Divider,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 1200,
      quantity: 1,
      image: "",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 2500,
      quantity: 2,
      image: "",
    },
  ]);

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Box sx={{ p: 3, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        My Cart
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {cartItems.length === 0 ? (
            <Card>
              <CardContent>
                <Typography>Your cart is empty.</Typography>
              </CardContent>
            </Card>
          ) : (
            cartItems.map((item) => (
              <Card key={item.id} sx={{ mb: 2, borderRadius: 3 }}>
                <CardContent>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={2}>
                      <Avatar
                        variant="rounded"
                        src={item.image}
                        sx={{ width: 90, height: 90 }}
                      >
                        {item.name.charAt(0)}
                      </Avatar>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <Typography fontWeight="bold">{item.name}</Typography>
                      <Typography color="text.secondary">
                        ₹{item.price}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <IconButton onClick={() => decreaseQty(item.id)}>
                          <RemoveIcon />
                        </IconButton>

                        <Typography>{item.quantity}</Typography>

                        <IconButton onClick={() => increaseQty(item.id)}>
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={2}>
                      <Typography fontWeight="bold">
                        ₹{item.price * item.quantity}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={1}>
                      <IconButton color="error" onClick={() => removeItem(item.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Order Summary
              </Typography>

              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Items</Typography>
                <Typography>{cartItems.length}</Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Subtotal</Typography>
                <Typography>₹{totalAmount}</Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Delivery</Typography>
                <Typography>₹0</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="space-between" mb={3}>
                <Typography fontWeight="bold">Total</Typography>
                <Typography fontWeight="bold">₹{totalAmount}</Typography>
              </Box>

              <Button variant="contained" fullWidth disabled={cartItems.length === 0}>
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartPage;