import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, alpha } from "@mui/material";
import R2RepairReportRow from "./R2RepairReportRow";

const R2RepairReport = () => {
    const optypes = [
        {
            value: 1
        },
        {
            value: 2
        },
        {
            value: 3
        },
        {
            value: 4
        },
        {
            value: 5
        },
        {
            value: 6
        },
        {
            value: 7
        },
        {
            value: 8
        },
        {
            value: 9
        },
        {
            value: 10
        },
        {
            value: 11
        }
    ];

    return(
        <TableContainer sx={{ bgcolor: alpha("#0080ff", 0.3) }}>
            <br />
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell aling="left" sx={{ fontWeight: "bold" }}>
                            Tipo de Reparacion
                        </TableCell>
                        <TableCell aling="left" sx={{ fontWeight: "bold" }}>
                            Numero de Tipos Distintos de Vehiculos
                        </TableCell>
                        <TableCell aling="left" sx={{ fontWeight: "bold" }}>
                            Monto
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {optypes.map((optype) => <R2RepairReportRow {...optype} key={optype.value}  />)}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default R2RepairReport;