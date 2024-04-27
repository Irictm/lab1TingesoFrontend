import { useEffect, useState } from "react";
import vehicleService from "../services/vehicle.service";
import { TableCell, TableRow } from "@mui/material";

const R1VehicleReportRow = (vehicle) => {
    const [values, setValues] = useState([]);

    const init = () => {
        vehicleService.getFormulaValues(vehicle.id)
        .then((response) => {
            console.log("Mostrando lista de valores", response.data);
            setValues(response.data);
        })
        .catch((error) => {
            console.log("Error en la obtencion del listado de valores", error);
        });
    };

    useEffect(() => {
        init();
    }, []);

    return(
        <TableRow key={vehicle.id} 
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
         >
            <TableCell align="left">{vehicle.patentNumber}</TableCell>
            <TableCell align="left">{values.at(0) + " %"}</TableCell>
            <TableCell align="left">{values.at(1)}</TableCell>
            <TableCell align="left">{values.at(2) + " %"}</TableCell>
            <TableCell align="left">{values.at(3) + " %"}</TableCell>
        </TableRow>
    );
}

export default R1VehicleReportRow;