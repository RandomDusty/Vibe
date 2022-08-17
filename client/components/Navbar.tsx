import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {AppBar, SvgIcon} from "@mui/material";
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AlbumIcon from '@mui/icons-material/Album';
import {useRouter} from "next/router";
import {router} from "next/client";
import {memo} from "react";

const drawerWidth = 240;

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}

const menuItems = [
    {text: 'Главная', href: '/'},
    {text: 'Список треков', href: '/tracks'},
    {text: 'Список альбомов', href: '/albums'}
];


const Navbar = memo( () =>{
    const [open, setOpen] = React.useState(false);
    const router = useRouter()

    const handleChange = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar sx={{backgroundColor: '#141414'}}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleChange}
                        edge="start"
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Vibe
                    </Typography>
                </Toolbar>

            </AppBar>
            <Drawer
                variant="persistent"
                anchor="left"
                sx={{
                    zIndex: 1000,
                    backgroundColor: '#fffcff',
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
                }}
                open={open}
            >
                <Toolbar/>

                <Box sx={{color: '#fffcff', backgroundColor: '#141414', height: '100%'}}>
                    <List>
                        {menuItems.map(({text, href}, index) => (
                            <ListItem disablePadding key={href} onClick={() => router.push(href, undefined, { shallow: true })}>
                                <ListItemButton>
                                    <ListItemIcon sx={{color: '#fffcff'}}>
                                        {index == 0 ? <HomeIcon/> :
                                            index == 1 ? <LibraryMusicIcon/> : <AlbumIcon/>}
                                    </ListItemIcon>
                                    <ListItemText primary={text}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
})

Navbar.displayName = 'Navbar';

export default Navbar;
