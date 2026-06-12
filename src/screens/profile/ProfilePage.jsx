import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Grid,
  TextField,
  Divider,
} from "@mui/material";
import axios from "axios";
import { API } from "../../Api";

const ProfilePage = () => {

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone:"",
    address:"",
    role:"",
  })
  // const user = {
  //   firstName: "Arun",
  //   lastName: "A",
  //   email: "arun@gmail.com",
  //   phone: "9876543210",
  //   address: "Tiruvannamalai, Tamil Nadu",
  //   role: "USER",
  // };

  const uid = localStorage.getItem("uid");

  const getProfile = (userID) => {
    try {
      axios.get(API + `/api/users/${userID}`)
        .then((res) => {
          console.log("User Profile: ", res.data);
          setUser(res.data);
        })
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  }

  console.log(user,'user')

  useEffect(() => {
    if (uid) {
      getProfile(uid);
    }
  }, [uid]);

  return (
    <Box sx={{ p: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        My Profile
      </Typography>

      <Grid container spacing={3}>
        {/* Left Profile Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, textAlign: "center", p: 2 }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                mx: "auto",
                mb: 2,
                fontSize: 40,
                bgcolor: "primary.main",
              }}
            >
              {user.firstName.charAt(0)}
            </Avatar>

            <Typography variant="h5" fontWeight="bold">
              {user.firstName} {user.lastName}
            </Typography>

            <Typography color="text.secondary">{user.email}</Typography>

            <Typography
              sx={{
                mt: 1,
                display: "inline-block",
                px: 2,
                py: 0.5,
                borderRadius: 2,
                bgcolor: "#e3f2fd",
                color: "#1976d2",
                fontSize: 14,
              }}
            >
              {user.role}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Button variant="contained" fullWidth>
              Edit Profile
            </Button>
          </Card>
        </Grid>

        {/* Right Details Form */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Personal Information
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="First Name"
                    fullWidth
                    value={user.firstName}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last Name"
                    fullWidth
                    value={user.lastName}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField label="Email" fullWidth value={user.email} />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField label="Phone" fullWidth value={user.phone} />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Address"
                    fullWidth
                    multiline
                    rows={3}
                    value={user.address}
                  />
                </Grid>
              </Grid>

              <Box mt={3} display="flex" gap={2}>
                <Button variant="contained">Save Changes</Button>
                <Button variant="outlined">Cancel</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;