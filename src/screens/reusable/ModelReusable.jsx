import { Box, Modal, Typography } from '@mui/material'
import React from 'react'

const ModelReusable = ({ open, onClose, title, children }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        {children}
      </Box>
    </Modal>
  )
}

export default ModelReusable