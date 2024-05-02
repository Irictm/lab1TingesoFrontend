import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bonusService from "../services/bonus.service";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, alpha } from "@mui/material";
import AddBoxTwoToneIcon from '@mui/icons-material/AddBoxTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

const BonusList = () => {
    const[bonuss, setBonus] = useState([]);

    const navigate = useNavigate();

    const init = () => {
        bonusService.getAll()
        .then((response) => {
            console.log("Mostrando lista de bonuses", response.data);
            setBonus(response.data);
        })
        .catch((error) => {
            console.log("Error en la obtencion del listado de bonuses", error);
        });
    };

    useEffect(() => {
        init();
    }, []);

    const handleDelete = (id) => {
        console.log("Id Bonus seleccionado: ", id);
        const confirmDelete = window.confirm("¿Esta seguro que desea borrar este bonus?");
        if (confirmDelete) {
            bonusService.remove(id)
            .then((response) => {
                console.log("Bonus eliminado exitosamente.", response.data);
                init();
            })
            .catch((error) => {
                console.log("Error en la eliminacion del bonus", error)
            });
        }
    };

    const handleEdit = (id) => {
        console.log("Id Bonus seleccionado: ", id);
        navigate(`/bonus/edit/${id}`)
    };

    return(
        <TableContainer sx={{ bgcolor: alpha("#0080ff", 0.3) }}>
            <br />
            <Link
              to="/bonus/add"
              style={{textDecoration: "none", marginBottom: "1rem" }}
            >
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddBoxTwoToneIcon />}
                >
                    Agregar Bonus
                </Button>
            </Link>
            <br />
            <br />
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell aling="left" sx={{ fontWeight: "bold" }}>
                            Monto
                        </TableCell>
                        <TableCell aling="left" sx={{ fontWeight: "bold" }}>
                            Marca
                        </TableCell>
                        <TableCell aling="left" sx={{ fontWeight: "bold" }}>
                            Cantidad Restante
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bonuss.map((bonus) => (
                        <TableRow key={bonus.id} 
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            <TableCell align="left">{bonus.amount}</TableCell>
                            <TableCell align="left">{bonus.brand}</TableCell>
                            <TableCell align="left">{bonus.numberRemaining}</TableCell>
                            <TableCell>
                                <Button
                                  variant="contained"
                                  color="info"
                                  size="small"
                                  onClick={() => handleEdit(bonus.id)}
                                  style={{marginLeft: "0.5rem" }}
                                  startIcon={<EditTwoToneIcon />}
                                  >
                                    Editar
                                </Button>
                                <Button
                                  variant="contained"
                                  color="error"
                                  size="small"
                                  onClick={() => handleDelete(bonus.id)}
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

export default BonusList;