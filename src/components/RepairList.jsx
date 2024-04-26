import { useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import  repairService from "../services/repair.service";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, alpha } from "@mui/material";
import AddBoxTwoToneIcon from '@mui/icons-material/AddBoxTwoTone';
import RepairRow from "./RepairRow";

const RepairList = () => {
    const[repairs, setRepairs] = useState([]);
    const init = () => {
        repairService.getAll()
        .then((response) => {
            console.log("Mostrando lista de reparaciones", response.data);
            setRepairs(response.data);
        })
        .catch((error) => {
            console.log("Error en la obtencion del listado de reparaciones", error);
        });
    };

    useEffect(() => {
        init();
    }, []);

    return(
        <TableContainer sx={{ bgcolor: alpha("#0080ff", 0.3) }}>
            <br />
            <Link
              to="/repairs/add"
              style={{textDecoration: "none", marginBottom: "1rem" }}
            >
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddBoxTwoToneIcon />}
                >
                    Agregar Reparacion
                </Button>
            </Link>
            <br />
            <br />
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell aling="left" sx={{ fontWeight: "bold" }}>
                            Id Vehiculo
                        </TableCell>
                        <TableCell aling="left" sx={{ fontWeight: "bold" }}>
                            Fecha de Admision
                        </TableCell>
                        <TableCell aling="left" sx={{ fontWeight: "bold" }}>
                            Fecha de Termino Reparacion
                        </TableCell>
                        <TableCell aling="left" sx={{ fontWeight: "bold" }}>
                            Fecha de Recogida del Auto
                        </TableCell>
                        <TableCell aling="left" sx={{ fontWeight: "bold" }}>
                            Monto Total
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {repairs.map((repair) => <RepairRow {...repair} key={repair.id} />)}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default RepairList;