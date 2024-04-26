import { useEffect, useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import  operationService from "../services/operation.service";
import { Button, Table, TableBody, TableCell, TableContainer, Box,
     TableHead, TableRow, alpha, IconButton, Collapse, Typography } from "@mui/material";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import KeyboardArrowUpTwoToneIcon from '@mui/icons-material/KeyboardArrowUpTwoTone';
import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone';

const RepairRow = (repair) => {
    const[operations, setOperations] = useState([]);
    const[open, setOpen] = useState(false);

    const navigate = useNavigate();

    const init = () => {
        operationService.getAllByRepair(repair.id)
        .then((response) => {
            console.log("Mostrando lista de operaciones", response.data);
            setOperations(response.data);
        })
        .catch((error) => {
            console.log("Error en la obtencion del listado de operaciones", error);
        });
    };

    useEffect(() => {
        init();
    }, []);

    const handleDelete = (id) => {
        console.log("Id Reparacion seleccionado: ", id);
        const confirmDelete = window.confirm("¿Esta seguro que desea borrar este reparacion?");
        if (confirmDelete) {
            repairService.remove(id)
            .then((response) => {
                console.log("Reparacion eliminado exitosamente.", response.data);
                init();
            })
            .catch((error) => {
                console.log("Error en la eliminacion del reparacion", error)
            });
        }
    };

    const handleEdit = (id) => {
        console.log("Id Reparacion seleccionado: ", id);
        navigate(`/repairs/edit/${id}`)
    };

    return(
    <Fragment>
        <TableRow key={repair.id} 
            sx={{ '& > *': { borderBottom: 'unset' } }}
            >
            <TableCell>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUpTwoToneIcon /> : 
                    <KeyboardArrowDownTwoToneIcon />}
                </IconButton>
            </TableCell>
            <TableCell align="left">{repair.id_vehicle}</TableCell>
            <TableCell align="left">{repair.dateOfAdmission}</TableCell>
            <TableCell align="left">{repair.dateOfRelease}</TableCell>
            <TableCell align="left">{repair.dateOfPickUp}</TableCell>
            <TableCell align="left">{repair.totalAmount}</TableCell>
            <TableCell>
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  onClick={() => handleEdit(repair.id)}
                  style={{marginLeft: "0.5rem" }}
                  startIcon={<EditTwoToneIcon />}
                >
                Editar
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(repair.id)}
                  style={{marginLeft: "0.5rem" }}
                  startIcon={<DeleteTwoToneIcon />}
                >
                Eliminar
                </Button>
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell style={{ pb: 0, 
                pt: 0 }}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                        <Typography variant="h5"
                            gutterBottom component="div">
                            Operations
                        </Typography>
                        <Table size="small"
                            aria-label="purchases">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Type
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {operations.map
                                    ((operation) => (
                                    <TableRow key=
                                        {operation.id}>
                                        <TableCell>
                                            {operation.type}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    </Fragment>
    );
}

export default RepairRow;