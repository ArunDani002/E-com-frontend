// HeaderNavbar.jsx (modified)
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Badge,
  Tooltip,
  Button,
  Modal
} from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import ListAltIcon from '@mui/icons-material/ListAlt'
import AddBoxIcon from '@mui/icons-material/AddBox'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import ModelReusable from '../reusable/ModelReusable'

const HeaderNavbar = ({
  // user = { name: 'A', avatarUrl: null },
  onProfile = () => {},
  onSettings = () => {},
  onLogout,
  onOrders = () => {},
  onCart = () => {},
  notificationsCount = 0
}) => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileAnchor, setMobileAnchor] = useState(null)
  const [openModel, setOpenModel] = useState(false);
  const [openSettingsModel, setOpenSettingsModel] = useState(false);
  const [openSellerModel, setOpenSellerModel] = useState(false);


  const open = Boolean(anchorEl)
  const mobileOpen = Boolean(mobileAnchor)

  const handleProfileClick = (e) => setAnchorEl(e.currentTarget)
  const handleProfileClose = () => setAnchorEl(null)

  const handleMobileOpen = (e) => setMobileAnchor(e.currentTarget)
  const handleMobileClose = () => setMobileAnchor(null)

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role")

  const userName = localStorage.getItem('userName')

  const Logout = () => {
    handleProfileClose()
    handleMobileClose()
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    navigate("/")
  }

  const Login = () => {
    navigate("/login")
  }

  const LoginSettings = () => {
    setOpenModel(true);
  }

  const Settings = () => {
    setOpenSettingsModel(true);
  }

  const Seller = () => {
    setOpenSellerModel(true);
  }

  const handleMenuAction = (action) => {
    switch (action) {
      case 'profile':
        navigate('/profile')
        handleProfileClose()
        break
      case 'settings':
        onSettings()
        handleProfileClose()
        break
      case 'logout':
        if (onLogout) {
          onLogout()
        } else {
          Logout()
        }
        break
      case 'orders':
        onOrders()
        handleProfileClose()
        break
      case 'cart':
        navigate('/cart')
        handleProfileClose()
        break
    }
  }

  const avatarContent = userName ? userName.charAt(0) : 'A'

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2', boxShadow: 'none' }}>
        <Toolbar sx={{ height: 60, px: { xs: 1, md: 3 } }}>
          {/* Left: Logo & categories */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Typography
              variant="h6"
              sx={{
                color: '#fff',
                fontWeight: '700',
                mr: 3,
                letterSpacing: 0.3,
                cursor: 'pointer'
              }}
              onClick={() => navigate('/')}
            >
              Take!t
            </Typography>

            <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2, alignItems: 'center' }}>
              <Typography sx={{ color: '#fff', fontSize: 14 }}>Electronics</Typography>
              <Typography sx={{ color: '#fff', fontSize: 14 }}>Gadgets</Typography>
              <Typography sx={{ color: '#fff', fontSize: 14 }}>Accessories</Typography>
              <Typography sx={{ color: '#fff', fontSize: 14 }}>Garments</Typography>
            </Box>
          </Box>

          {/* Right: Add product + icons + profile */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {role === "SELLER" &&
              <>
                <Button
                  variant="contained"
                  startIcon={<AddBoxIcon />}
                  onClick={() => navigate('/sell')}
                  sx={{ mr: 1 }}
                  size="small"
                >
                  Add Product
                </Button>

                <Button
                  variant="contained"
                  startIcon={<AddBoxIcon />}
                  onClick={() => navigate('/my-products')}
                  sx={{ mr: 1 }}
                  size="small"
                >
                  View My Products
                </Button>
              </>
            }



            <Tooltip title="Cart">
              <IconButton size="large" onClick={() => handleMenuAction('cart')} sx={{ color: '#fff' }}>
                <Badge badgeContent={0} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Notifications">
              <IconButton size="large" sx={{ color: '#fff' }}>
                <Badge badgeContent={notificationsCount} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            {token ? (
              <>
                {role === 'ADMIN' && (
                  <Button
                    variant="contained"
                    startIcon={<AdminPanelSettingsIcon />}
                    onClick={() => navigate('/admin')}
                    sx={{ mr: 1, display: { xs: 'none', sm: 'inline-flex' } }}
                    size="small"
                  >
                    Admin
                  </Button>
                )}

                <Tooltip title="Account">
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account"
                    aria-controls={open ? 'profile-menu' : undefined}
                    aria-haspopup="true"
                    onClick={handleProfileClick}
                    sx={{ ml: 1 }}
                  >
                    <Avatar>
                      {userName?.charAt(0)}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <Button sx={{ color: '#fff', fontSize: 14 }} onClick={() => LoginSettings()}>login</Button>
            )}

            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton size="large" onClick={handleMobileOpen} sx={{ color: '#fff' }}>
                <MoreVertIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Profile and Mobile menus (unchanged) */}
          <Menu id="profile-menu" anchorEl={anchorEl} open={open} onClose={handleProfileClose}>
            <MenuItem onClick={() => handleMenuAction('profile')}>
              <PersonIcon fontSize="small" sx={{ mr: 1 }} /> Profile
            </MenuItem>
            <MenuItem onClick={() => handleMenuAction('orders')}>
              <ListAltIcon fontSize="small" sx={{ mr: 1 }} /> Orders
            </MenuItem>
            <MenuItem onClick={() => Settings()}>
              <SettingsIcon fontSize="small" sx={{ mr: 1 }} /> Settings
            </MenuItem>
            <MenuItem onClick={() => Seller()}>
              <SettingsIcon fontSize="small" sx={{ mr: 1 }} /> Become a Seller?
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => Logout()}>
              <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>

          <Menu id="mobile-menu" anchorEl={mobileAnchor} open={mobileOpen} onClose={handleMobileClose}>
            <MenuItem onClick={() => navigate('/sell')}>
              <AddBoxIcon fontSize="small" sx={{ mr: 1 }} /> Add Product
            </MenuItem>
            <MenuItem onClick={() => handleMenuAction('cart')}>
              <ShoppingCartIcon fontSize="small" sx={{ mr: 1 }} /> Cart
            </MenuItem>
            <MenuItem onClick={() => handleMenuAction('orders')}>
              <ListAltIcon fontSize="small" sx={{ mr: 1 }} /> Orders
            </MenuItem>
            <MenuItem onClick={() => handleMenuAction('settings')}>
              <SettingsIcon fontSize="small" sx={{ mr: 1 }} /> Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => handleMenuAction('logout')}>
              <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>


      <ModelReusable
        open={openModel}
        onClose={() => setOpenModel(false)}
        title="Login Required"
        children={
          <>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
              Please login to continue using this feature.
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
              <Button onClick={() => setOpenModel(false)}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setOpenModel(false)
                  navigate("/login")
                }}
              >
                Login
              </Button>
            </Box>
          </>
        }
      />

      <ModelReusable
        open={openSellerModel}
        onClose={() => setOpenSellerModel(false)}
        title="Seller Registeration"
      >


      </ModelReusable>





    </>
  )
}

export default HeaderNavbar
