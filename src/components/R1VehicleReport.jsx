import { useEffect, useState } from "react";
import vehicleService from "../services/vehicle.service";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, alpha } from "@mui/material";
import R1VehicleReportRow from "./R1VehicleReportRow";

const R1VehicleReport = () => {
    const[vehicles, setVehicles] = useState([]);

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


    return(
        <TableContainer sx={{ bgcolor: alpha("#0080ff", 0.3) }}>
            <br />
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell aling="left" sx={{ fontWeight: "bold" }}>
                            Patente
                        </TableCell>
                        <TableCell aling="left" sx={{ fontWeight: "bold" }}>
                            Descuento Numero de Reparaciones
                        </TableCell>
                        <TableCell aling="left" sx={{ fontWeight: "bold" }}>
                            Descuento Bonus
                        </TableCell>
                        <TableCell aling="left" sx={{ fontWeight: "bold" }}>
                            Recarga por Antiguedad
                        </TableCell>
                        <TableCell aling="left" sx={{ fontWeight: "bold" }}>
                            Recarga por Kilometraje
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {vehicles.map((vehicle) => <R1VehicleReportRow {...vehicle} key={vehicle.id}  />)}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default R1VehicleReport;