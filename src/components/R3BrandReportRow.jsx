import { useEffect, useState } from "react";
import repairService from "../services/repair.service";
import { TableCell, TableRow } from "@mui/material";
import {  intervalToDuration } from "date-fns"

const R3BrandReportRow = (brand) => {
    const [avgtime, setAvgtime] = useState("");

    const formatTime = (received) => {
        const duration = intervalToDuration({ start: 0, end: received * 1000 });
        const noundefined = (num) => (String(num) == "undefined") ? num="00" : num
        const zeroPad = (num) => String(num).padStart(2, '0')   ;
        const dateform = [
            duration.years,
            duration.months,
            duration.days
        ].map(noundefined)
        .map(zeroPad)
        .join('-');
        const timeform = [
            duration.hours,
            duration.minutes,
            duration.seconds
        ].map(noundefined)
        .map(zeroPad)
        .join(':');
        return (dateform + " " + timeform);
    }

    const init = () => {
        repairService.avgtimebrand(brand.value)
        .then((response) => {
            console.log("Mostrando avgtime:", response.data);
            setAvgtime(formatTime(response.data));
        })
        .catch((error) => {
            console.log("Error en la obtencion de avgtime", error);
        });
    };

    useEffect(() => {
        init();
    }, []);

    return(
        <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
         >
            <TableCell align="left">{brand.value}</TableCell>
            <TableCell align="left">{avgtime}</TableCell>
        </TableRow>
    );
}

export default R3BrandReportRow;