import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { API } from "../../Api";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);


  const getCartItems = async () => {
    try {
      const res = await axios.get(
        API + "/api/cart",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setCartItems(res.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    getCartItems();
  }, [])

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

  const removeItem = async (id) => {
    try {
      await axios.delete(API + `/api/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      await getCartItems();
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  console.log(cartItems, 'cart items')

  const totalAmount = cartItems?.reduce(
    (total, item) => total + item?.product?.productPrice * item.quantity,
    0
  );

  console.log(totalAmount, 'total amount')

  return (
    <Box sx={{ p: 3, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        My Cart
      </Typography>

      <Grid container spacing={3}>
        <Grid  >
          {cartItems?.length === 0 ? (
            <Card>
              <CardContent>
                <Typography>Your cart is empty.</Typography>
              </CardContent>
            </Card>
          ) : (
            cartItems?.map((item) => (
              <Card key={item.id} sx={{ mb: 2, borderRadius: 3 }}>
                {/* {console.log(item,'item in cart')} */}
                <CardContent>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid >
                      <Avatar
                        variant="rounded"
                        src={item.product?.productImageUrl}
                        sx={{ width: 90, height: 90 }}
                      >
                        {item.product?.productName?.charAt(0)}
                      </Avatar>
                    </Grid>

                    <Grid >
                      <Typography fontWeight="bold">{item.product?.productName}</Typography>
                      <Typography color="text.secondary">
                        ₹{item.product?.productPrice}
                      </Typography>
                    </Grid>

                    <Grid >
                      <Box display="flex" alignItems="center" gap={1}>
                        <IconButton onClick={() => decreaseQty(item.id)}>
                          <RemoveIcon />
                        </IconButton>

                        <Typography>{item?.quantity}</Typography>

                        <IconButton onClick={() => increaseQty(item.id)}>
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </Grid>

                    <Grid  >
                      <Typography fontWeight="bold">
                        ₹{item?.product?.productPrice * item.quantity}
                      </Typography>
                    </Grid>

                    <Grid  >
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

        <Grid >
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Order Summary
              </Typography>

              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Items</Typography>
                <Typography>{cartItems?.length}</Typography>
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

              <Button variant="contained" fullWidth disabled={cartItems?.length === 0}>
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