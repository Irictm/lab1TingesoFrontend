import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import vehicleService from "../services/vehicle.service";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, alpha } from "@mui/material";
import AddBoxTwoToneIcon from '@mui/icons-material/AddBoxTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

const VehicleList = () => {
    const[vehicles, setVehicles] = useState([]);

    const navigate = useNavigate();

    const init = () => {
        vehicleService.getAll()
        .then((response) => {
            console.log("Mostrando lista de vehiculos", response.data);
            setVehicles(response.data);
        })
        .catch((error) => {
            console.log("Error en la obtencion del listado de vehiculos", error);
        });
    };

    useEffect(() => {
        init();
    }, []);

    const handleDelete = (id) => {
        console.log("Id Vehiculo seleccionado: ", id);
        const confirmDelete = window.confirm("¿Esta seguro que desea borrar este vehiculo?");
        if (confirmDelete) {
            vehicleService.remove(id)
            .then((response) => {
                console.log("Vehiculo eliminado exitosamente.", response.data);
                init();
            })
            .catch((error) => {
                console.log("Error en la eliminacion del vehiculo", error)
            });
        }
    };

    const handleEdit = (id) => {
        console.log("Id Vehiculo seleccionado: ", id);
        navigate(`/vehicles/edit/${id}`)
    };

    return(
        <TableContainer sx={{ bgcolor: alpha("#0080ff", 0.3) }}>
            <br />
            <Link
              to="/vehicles/add"
              style={{textDecoration: "none", marginBottom: "1rem" }}
            >
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddBoxTwoToneIcon />}
                >
                    Agregar Vehiculo
                </Button>
            </Link>
            <br />
            <br />
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell aling="left" sx={{ fontWeight: "bold" }}>
                            Patente
                        </TableCell>
                        <TableCell aling="left" sx={{ fontWeight: "bold" }}>
                            Marca
                        </TableCell>
                        <TableCell aling="left" sx={{ fontWeight: "bold" }}>
                            Modelo
                        </TableCell>
                        <TableCell aling="left" sx={{ fontWeight: "bold" }}>
                            Tipo
                        </TableCell>
                        <TableCell aling="left" sx={{ fontWeight: "bold" }}>
                            Año fabricación
                        </TableCell>
                        <TableCell aling="left" sx={{ fontWeight: "bold" }}>
                            Tipo de Motor
                        </TableCell>
                        <TableCell aling="left" sx={{ fontWeight: "bold" }}>
                            Número de Asientos
                        </TableCell>
                        <TableCell aling="left" sx={{ fontWeight: "bold" }}>
                            Kilometraje
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {vehicles.map((vehicle) => (
                        <TableRow key={vehicle.id} 
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            <TableCell align="left">{vehicle.patentNumber}</TableCell>
                            <TableCell align="left">{vehicle.brand}</TableCell>
                            <TableCell align="left">{vehicle.model}</TableCell>
                            <TableCell align="left">{vehicle.type}</TableCell>
                            <TableCell align="left">{vehicle.fabricationDate}</TableCell>
                            <TableCell align="left">{vehicle.motorType}</TableCell>
                            <TableCell align="left">{vehicle.numberOfSeats}</TableCell>
                            <TableCell align="left">{vehicle.mileage}</TableCell>
                            <TableCell>
                                <Button
                                  variant="contained"
                                  color="info"
                                  size="small"
                                  onClick={() => handleEdit(vehicle.id)}
                                  style={{marginLeft: "0.5rem" }}
                                  startIcon={<EditTwoToneIcon />}
                                  >
                                    Editar
                                </Button>
                                <Button
                                  variant="contained"
                                  color="error"
                                  size="small"
                                  onClick={() => handleDelete(vehicle.id)}
                                  style={{marginLeft: "0.5rem" }}
                                  startIcon={<DeleteTwoToneIcon />}
                                >
                                    Eliminar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default VehicleList;