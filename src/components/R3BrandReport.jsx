import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, alpha } from "@mui/material";
import R3BrandReportRow from "./R3BrandReportRow";

const R3BrandReport = () => {
    const brands = [
        {
            value: 'Toyota'
        },
        {
            value: 'Kia'
        },
        {
            value: 'Honda'
        },
        {
            value: 'Ford'
        },
        {
            value: 'Chevrolet'
        },
        {
            value: 'Hyundai'
        }
    ];

    return(
        <TableContainer sx={{ bgcolor: alpha("#0080ff", 0.3) }}>
            <br />
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell aling="left" sx={{ fontWeight: "bold" }}>
                            Marca
                        </TableCell>
                        <TableCell aling="left" sx={{ fontWeight: "bold" }}>
                            Tiempo Promedio de Reparacion
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {brands.map((brand, index) => <R3BrandReportRow {...brand} key={index}  />)}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default R3BrandReport;