import { useEffect, useState } from "react";
import repairService from "../services/repair.service";
import { TableCell, TableRow } from "@mui/material";

const R2RepairReportRow = (optype) => {
    const [values, setValues] = useState([]);

    const init = () => {
        repairService.valuesR2(optype.value)
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
        <TableRow key={optype.value} 
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
         >
            <TableCell align="left">{optype.value}</TableCell>
            <TableCell align="left">{values.at(0)}</TableCell>
            <TableCell align="left">{values.at(1)}</TableCell>
        </TableRow>
    );
}

export default R2RepairReportRow;