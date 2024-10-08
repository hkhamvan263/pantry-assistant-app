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
import {firestore} from '@/firebase'
import {useState, useEffect} from 'react'
import {
  collection,
  doc,
  deleteDoc,
  getDocs,
  query,
  setDoc,
  getDoc
} from 'firebase/firestore'

export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterInventory, setFilterInventory] = useState([]);
  
  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data()
      })
    })
    setInventory(inventoryList)
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const {quantity} = docSnap.data()
      await setDoc(docRef, {quantity: quantity + 1})
    } else {
      await setDoc(docRef, {quantity: 1})
    }

    await updateInventory()
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const {quantity} = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, {quantity: quantity - 1})
      }
    }

    await updateInventory()
  }

  useEffect(() => {
    updateInventory()
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    const searching = searchQuery.toLowerCase()
    if (searchQuery !== '') {
      const filter = inventory.filter((item) =>
        item.name.toLowerCase().startsWith(searching)
      )
      setFilterInventory(filter)
    }
    else setFilterInventory(inventory)
  }, [searchQuery, inventory])

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
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%" left="50%"
          width={400}
          bgcolor="white"
          border="2px solid #000"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Typography variant="h6"> Add item </Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              variant='filled'
              fullWidth
              value={itemName}
              sx={{boxShadow: 4}}
              onChange={(e) => {
                setItemName(e.target.value)
                if (e.target.value) {
                  setError('')
                }
              }}
              error={!!error}
              helperText={error}
            />
            <Button
              variant="outlined"
              sx={{boxShadow: 5}}
              onClick={() => {
                if (!itemName.trim()) {
                  setError('Item name cannot be blank')
                  return
                }
                addItem(itemName)
                setItemName('')
                handleClose()
              }}
              color="success"
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
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
