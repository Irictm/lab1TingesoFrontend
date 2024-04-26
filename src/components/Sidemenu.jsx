import * as React from "react";
import Box from "@mui/material/Box"
import { useNavigate } from "react-router-dom";
import { Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import DirectionsCarTwoToneIcon from '@mui/icons-material/DirectionsCarTwoTone';
import HandymanTwoToneIcon from '@mui/icons-material/HandymanTwoTone';
import AssessmentTwoToneIcon from '@mui/icons-material/AssessmentTwoTone';

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

            <ListItemButton onClick={() => navigate("/reports")}>
              <ListItemIcon>
                <AssessmentTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Reportes" />
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