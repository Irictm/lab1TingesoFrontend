import * as React from "react";
import Box from "@mui/material/Box"
import { useNavigate } from "react-router-dom";
import { Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import DirectionsCarTwoToneIcon from '@mui/icons-material/DirectionsCarTwoTone';
import HandymanTwoToneIcon from '@mui/icons-material/HandymanTwoTone';
import AssessmentTwoToneIcon from '@mui/icons-material/AssessmentTwoTone';
import LocalAtmTwoToneIcon from '@mui/icons-material/LocalAtmTwoTone';

export default function Sidemenu({ open, toggleDrawer }) {
    const navigate = useNavigate();

    const listOptions = () => (
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <List>
            <ListItemButton onClick={() => navigate("/home")}>
              <ListItemIcon>
                <HomeTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>

            <Divider />
            <ListItemButton onClick={() => navigate("/vehicles")}>
              <ListItemIcon>
                <DirectionsCarTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Vehiculos" />
            </ListItemButton>

            <ListItemButton onClick={() => navigate("/repairs")}>
              <ListItemIcon>
                <HandymanTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Reparaciones" />
            </ListItemButton>

            <ListItemButton onClick={() => navigate("/bonus")}>
              <ListItemIcon>
                <LocalAtmTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Bonus" />
            </ListItemButton>

            <Divider />
            <ListItemButton onClick={() => navigate("/reports/r1")}>
              <ListItemIcon>
                <AssessmentTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Reporte 1: Vehiculos" />
            </ListItemButton>

            <ListItemButton onClick={() => navigate("/reports/r3")}>
              <ListItemIcon>
                <AssessmentTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Reporte 3: Marcas" />
            </ListItemButton>
          </List>
        </Box>
    );
    return (
      <div>
        <Drawer anchor={"left"} open={open} onClose={toggleDrawer(false)}>
          {listOptions()}
        </Drawer>
      </div>
    );
}