import { useState } from "react"
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BusinessIcon from '@mui/icons-material/Business';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';



function Header (){
    const [state, setState] = useState({
        left:false,
    });
    const toggleDrawer = (anchor, open) =>(e)=>{
        if(
            e.type === 'keydown' && (e.key === 'Tab' || e.key ==='Shift')
        ){
            return;
        }
        setState ({...state, [anchor]:open});
    };
    const list = (anchor)=>(
        <Box
        sx={{
            width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,
        }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
    >
        <List>
            <ListItem button>
                <ListItemIcon>
                    <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary={'Company'} />
            </ListItem>

            <ListItem buttons>
                <ListItemIcon>
                    <HomeWorkIcon />
                </ListItemIcon>
                <ListItemText primary={'Complexes'} />
            </ListItem>

            <ListItem button>
                <ListItemIcon>
                    <MeetingRoomIcon />
                </ListItemIcon>
                <ListItemText primary={'Rooms'} />
            </ListItem>

            <ListItem button>
                <ListItemIcon>
                    <AccountBalanceIcon />
                </ListItemIcon>
                <ListItemText primary={'Banks'} />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem button>
                <ListItemIcon>
                    <BookmarkBorderIcon />
                </ListItemIcon>
                <ListItemText primary={'Orders'} />
            </ListItem>
        </List>
    </Box>
    )

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar className="container">
                <IconButton
                    onClick={toggleDrawer('left', true)}
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1 }}
                >
                    CredoHouse
                </Typography>
            </Toolbar>
        </AppBar>
            <Drawer
                anchor="left"
                open={state['left']}
                onClose={toggleDrawer('left', false)}
            >
                {list('left')}
            </Drawer>
    </Box>
    )
}

export default Header;