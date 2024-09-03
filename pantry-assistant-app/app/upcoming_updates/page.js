'use client'
import {
    Box,
    Stack,
    Typography,
    Toolbar,
    AppBar,
    IconButton,
  } from '@mui/material'
  import {Kitchen, Menu} from '@mui/icons-material'

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
        </Toolbar>
      </AppBar>
      <Typography variant="h2" color="#333">Upcoming Updates</Typography>
      <Typography component="ul">
        <Typography component="li">Notifications for expiring items</Typography>
        <Typography component="li">Integration with grocery lists to automatically update pantry inventory</Typography>
        <Typography component="li">Improved item categorization for better organization</Typography>
        <Typography component="li">Dark Mode</Typography>
        <Typography component="li">AI APIs</Typography>
        <Typography component="li">A camera to add images of each item</Typography>
        <Typography component="li">Navigation Menu</Typography>
        <Typography component="li">Sign In and Sign Up functionalities</Typography>
        <Typography component="li">Other UI modifications</Typography>
      </Typography>
    </Box>
    )
}