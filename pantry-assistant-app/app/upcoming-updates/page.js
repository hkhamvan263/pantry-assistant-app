'use client'
import {
  Box,
  Modal,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  Toolbar,
  Button,
  AppBar,
  IconButton,
} from '@mui/material'
import {Search, Kitchen, Menu} from '@mui/icons-material'

export default function UpcomingUpdates() {
  return (
    <Box width ="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      gap={2}
      bgcolor="#e7f5fe"
      overflow="auto"
    >
      <AppBar position="absolute" sx={{bgcolor: "#FAC898"}}>
        <Toolbar>
          <Menu />
          <IconButton color="inherit" href="/">
            <Kitchen />
          </IconButton>
          <Typography
            variant='h4'
            component="div"
            color='#333'
            sx={{fontWeight: "bold", flexGrow: 1}}
          >
            Pantry Assistant
          </Typography>
          <Box bgcolor="#FFE5B4" sx={{display: 'flex', alignItems: 'flex-end', boxShadow: 4}}>
            <TextField
              variant='filled'
              label="Search Bar"
              value={searchQuery}
              id="input-with-icon-textfield"
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Typography color='#333'>
        Hello, this is the Pantry Assistant. I'm here to add food, beverages, spices/flavorings,
         sauces, and condiments to the pantry.
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          handleOpen()
        }}
      >
        Add New Item
      </Button>
      <Box
        border='3px solid #333'
        borderRadius="10px"
        bgcolor="#333"
      >
        <Box
          width="800px"
          height="100px"
          bgcolor="#B19CD9"
          alignItems="center"
          justifyContent="center"
          display="flex"
          boxShadow={10}
          borderRadius="6px"
          border='3px solid #333'
        >
          <Typography variant="h2" color="#333">
            Pantry Items
          </Typography>
        </Box>
        <Stack
          width="800px"
          height="300px"
          spacing={2}
          overflow="auto"
          bgcolor='#b0b0b0'
          boxShadow={10}
          borderRadius="6px"
          border='3px solid #333'
        >
          {filterInventory.map(({name, quantity}) => (
            <Box
              key={name}
              width="100%"
              minHeight="150px"
              display='flex'
              alignItems="center"
              justifyContent="space-between"
              bgcolor='#F5F5DC'
              padding={5}
              boxShadow={1}
              borderRadius="6px"
              border='3px solid #b0b0b0'
              >
              <Typography variant='h4' color='#333' textAlign='center'>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant='h4' color='#333' textAlign='center'>
                {quantity}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  onClick={() => {
                    addItem(name)
                  }}
                  color="success"
                >
                  Add
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    removeItem(name)
                  }}
                  color="error"
                >
                  Remove
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}
