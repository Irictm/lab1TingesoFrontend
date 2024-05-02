import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import repairService from "../services/repair.service";
import { Box, Button, FormControl, TextField, alpha } from "@mui/material";
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import { format } from 'date-fns'

const AddEditRepair = () => {
    const { id } = useParams()
    const [id_vehicle, setIdVehicle] = useState("");
    const [dateOfAdmission, setDateOfAdmission] = useState("");
    const [dateOfRelease, setDateOfRelease] = useState("");
    const [dateOfPickUp, setDateOfPickUp] = useState("");
    const [totalAmount, setTotalAmount] = useState("");

    const [titleRepairForm, setTitleRepairForm] = useState("");
    const navigate = useNavigate();

    const saveRepair = (e) => {
        e.preventDefault();

        setDateOfAdmission(format(dateOfAdmission, "yyyy-MM-dd HH:mm:ss"))
        setDateOfRelease(format(dateOfRelease, "yyyy-MM-dd HH:mm:ss"))
        setDateOfPickUp(format(dateOfPickUp, "yyyy-MM-dd HH:mm:ss"))
        const repair = { id, id_vehicle, dateOfAdmission, dateOfRelease, dateOfPickUp, totalAmount };
        if (id) {
            repairService.update(repair)
            .then((response) => {
                console.log("Reparacion actualizando.", response.data);
                navigate("/repairs");
            })
            .catch((error) => {
                console.log("Error actualizando la reparacion.", error);
            });
        } else {
            setTotalAmount(0);
            repairService.create(repair)
            .then((response) => {
                console.log("Reparacion ha sido añadido.", response.data);
                navigate("/repairs");
            })
            .catch((error) => {
                console.log("Error en la creacion de una nueva reparacion", error);
            });
        }
    };

    useEffect(() => {
        if (id) {
            setTitleRepairForm("Editar Reparacion");
            repairService.get(id).then((repair) => {
                setIdVehicle(repair.data.id_vehicle);
                setDateOfAdmission(repair.data.dateOfAdmission);
                setDateOfRelease(repair.data.dateOfRelease);
                setDateOfPickUp(repair.data.dateOfPickUp);
                setTotalAmount(repair.data.totalAmount);
            })
            .catch((error) => {
                console.log("Se ha producido un error.", error);
              });
        } else {
            setTitleRepairForm("Crear Reparacion");
        }
    }, []);

    return(
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          component="form"
          sx={{ bgcolor: alpha("#0080ff", 0.3), pl: 3, pr: 3}}
        >
            <h2> {titleRepairForm} </h2>
            <form>
                <FormControl fullWidth>
                    <TextField 
                      id="id_vehicle"
                      label="Id del Vehiculo"
                      value={id_vehicle}
                      variant="standard"
                      onChange={(e) => setIdVehicle(e.target.value)}
                    />
                </FormControl>

                <FormControl fullWidth sx={{ mt: 2}}>
                    <TextField 
                     id="dateOfAdmission"
                     label="Fecha de Admision"
                     type="datetime-local"
                     value={dateOfAdmission}
                     variant="standard"
                     onChange={(e) => setDateOfAdmission(e.target.value)}
                     InputLabelProps={{
                        shrink: true,
                      }}
                    />
                </FormControl>

                <FormControl fullWidth sx={{ mt: 2}}>
                    <TextField 
                     id="dateOfRelease"
                     label="Fecha de Termino Reparaciones"
                     type="datetime-local"
                     value={dateOfRelease}
                     variant="standard"
                     onChange={(e) => setDateOfRelease(e.target.value)}
                     InputLabelProps={{
                        shrink: true,
                      }}
                    />
                </FormControl>

                <FormControl fullWidth sx={{ mt: 2}}>
                    <TextField 
                     id="dateOfPickUp"
                     label="Fecha de Recogida del Vehiculo"
                     type="datetime-local"
                     value={dateOfPickUp}
                     variant="standard"
                     onChange={(e) => setDateOfPickUp(e.target.value)}
                     InputLabelProps={{
                        shrink: true,
                      }}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <TextField 
                     id="totalAmount"
                     disabled
                     label="Costo total"
                     type="number"
                     value={totalAmount}
                     variant="standard"
                    />
                </FormControl>

                <FormControl>
                    <br />
                    <Button
                      variant="contained"
                      color="info"
                      onClick={(e) => saveRepair(e)}
                      style={{ marginLeft: "0.5rem" }}
                      startIcon={<SaveTwoToneIcon />}
                    >
                    Grabar
                    </Button>
                </FormControl>
            </form>
            <br />
            <Link to="/repairs">Volver a la lista</Link>
            <br />
        </Box>
    );
};

export default AddEditRepair;