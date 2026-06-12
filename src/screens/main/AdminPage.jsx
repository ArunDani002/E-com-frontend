import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Chip
} from '@mui/material'
import { API } from '../../Api'

const AdminPage = () => {
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const role = localStorage.getItem('role')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, productsRes, ordersRes] = await Promise.all([
          axios.get(API + '/api/users'),
          axios.get(API + '/api/products'),
          axios.get(API + '/api/orders').catch(() => ({ data: [] }))
        ])

        setUsers(Array.isArray(usersRes.data) ? usersRes.data : [])
        setProducts(Array.isArray(productsRes.data) ? productsRes.data : [])
        setOrders(Array.isArray(ordersRes.data) ? ordersRes.data : [])
      } catch (err) {
        console.error(err)
        setError('Unable to load admin dashboard data. Some items may be unavailable.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (role !== 'ADMIN') {
    return (
      <Box sx={{ p: 4, minHeight: '100vh', bgcolor: '#f5f5f5' }}>
        <Card sx={{ borderRadius: 3, p: 4, maxWidth: 600, mx: 'auto' }}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Access denied
          </Typography>
          <Typography color="text.secondary">
            You must be an admin to view this page.
          </Typography>
        </Card>
      </Box>
    )
  }

  const totalUsers = users.length
  const sellerList = users.filter((user) => user.role === 'SELLER')
  const totalSellers = sellerList.length
  const totalProducts = products.length

  const totalSoldProducts = orders.reduce((count, order) => {
    if (order.quantity) return count + order.quantity
    if (Array.isArray(order.items)) return count + order.items.reduce((sum, item) => sum + (item.quantity || 1), 0)
    return count
  }, 0)

  const summaryItems = [
    {
      label: 'Total Users',
      value: totalUsers,
      subtitle: 'Registered customers and sellers'
    },
    {
      label: 'Total Sellers',
      value: totalSellers,
      subtitle: 'Active seller accounts'
    },
    {
      label: 'Total Products',
      value: totalProducts,
      subtitle: 'Products listed in the marketplace'
    },
    {
      label: 'Sold Products',
      value: totalSoldProducts,
      subtitle: 'Products sold through orders'
    }
  ]

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="h4" fontWeight="bold">
          Admin Dashboard
        </Typography>
        <Typography color="text.secondary">
          Monitor registered users, sellers, inventory and order performance from one place.
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {error && (
            <Typography color="error" sx={{ mb: 3 }}>
              {error}
            </Typography>
          )}

          <Grid container spacing={3}>
            {summaryItems.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.label}>
                <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2, height: '100%' }}>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      {item.label}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {item.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {item.subtitle}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={6}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardContent>
                  <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" fontWeight="bold">
                      Recent Users
                    </Typography>
                    <Chip label={`${totalUsers} total`} color="primary" />
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Role</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {users.slice(0, 5).map((user) => (
                          <TableRow key={user.id || user._id || user.uuid || user.username}>
                            <TableCell>{user.firstName || user.name || user.username || 'Unknown'}</TableCell>
                            <TableCell>{user.email || '-'}</TableCell>
                            <TableCell>{user.role || 'USER'}</TableCell>
                          </TableRow>
                        ))}
                        {users.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={3} align="center">
                              No users found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardContent>
                  <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" fontWeight="bold">
                      Top Sellers
                    </Typography>
                    <Chip label={`${totalSellers} sellers`} color="primary" />
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell># Products</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {sellerList.slice(0, 5).map((seller) => (
                          <TableRow key={seller.id || seller._id || seller.uuid || seller.username}>
                            <TableCell>{seller.firstName || seller.name || seller.username || 'Unknown'}</TableCell>
                            <TableCell>{seller.email || '-'}</TableCell>
                            <TableCell>{seller.products?.length ?? '-'}</TableCell>
                          </TableRow>
                        ))}
                        {sellerList.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={3} align="center">
                              No sellers found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" mb={2}>
                    Latest Products
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Product</TableCell>
                          <TableCell>Category</TableCell>
                          <TableCell>Price</TableCell>
                          <TableCell>Sold</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {products.slice(0, 6).map((product) => (
                          <TableRow key={product.id || product._id || product.productId || product.productName}>
                            <TableCell>{product.productName || product.name || 'Untitled'}</TableCell>
                            <TableCell>{product.category || '-'}</TableCell>
                            <TableCell>₹{product.productPrice ?? product.price ?? 0}</TableCell>
                            <TableCell>{product.soldQuantity ?? product.sold ?? '-'}</TableCell>
                          </TableRow>
                        ))}
                        {products.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={4} align="center">
                              No products found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  )
}

export default AdminPage
