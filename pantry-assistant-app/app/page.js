'use client'
import {
  Box,
  Modal,
  Stack,
  TextField,
  Typography,
  InputBase,
  Toolbar,
  Button,
  AppBar,
  styled,
  alpha,
  IconButton,
  Autocomplete
} from '@mui/material'
import {Search, Kitchen} from '@mui/icons-material'
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
  const [items, setItems] = useState([])
  
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

  const SearchField = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    }
  }))
  
  const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }))
  
  const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    }
  }))

  useEffect(() => {
    const fetchItems = async () => {
      const itemsCollection = query(collection(firestore, 'items'))
      const itemsSnapshot = await getDocs(itemsCollection)
      const itemsList = itemsSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
      setItems(itemsList)
    }

    fetchItems()
  }, [])

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Box width ="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      gap={2}
      bgcolor="#FDFD96"
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
              sx={{boxShadow: 3}}
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
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <AppBar position="absolute" sx={{bgcolor: "#FAC898"}}>
        <Toolbar>
          <Kitchen />
          <Typography
            variant='h4'
            component="div"
            color='#333'
            sx={{fontWeight: "bold", flexGrow: 1}}
          >
            Pantry Assistant
          </Typography>
          <Box display="flex" alignItems="center" ml={2}>
            <InputBase
              placeholder="Search Bar"
              value={searchQuery}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ ml: 1, flex: 1 }}
            />
            <IconButton type="submit" aria-label="search">
              <Search style={{ color: 'white' }} />
            </IconButton>
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
      <Box border='1px solid #333'>
        <Box
          width="800px"
          height="100px"
          bgcolor="#B19CD9"
          alignItems="center"
          justifyContent="center"
          display="flex"
          boxShadow={10}
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
        >
          {inventory.map(({name, quantity}) => (
            <Box
              key={name}
              width="100%"
              minHeight="150px"
              display='flex'
              alignItems="center"
              justifyContent="space-between"
              bgcolor='#F5F5DC'
              padding={5}
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
                >
                  Add
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    removeItem(name)
                  }}
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
