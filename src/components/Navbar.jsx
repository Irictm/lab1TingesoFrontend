import * as React from "react";
import Sidemenu from "./Sidemenu";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';

export default function Navbar() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (open) => (event) => {
        setOpen(open);
    };

    return (
        <Box sx= {{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      sx={{mr: 6}}
                      onClick={toggleDrawer(true)}
                    >
                        <MenuTwoToneIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        SisGRV: Sistema de Gestion de Reparacion de Vehiculos
                    </Typography>
                </Toolbar>
            </AppBar>
            <Sidemenu open={open} toggleDrawer={toggleDrawer}></Sidemenu>
        </Box>
    );
}