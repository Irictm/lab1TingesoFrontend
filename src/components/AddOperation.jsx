import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import operationService from "../services/operation.service";
import { Box, Button, FormControl, TextField, alpha } from "@mui/material";
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';

const AddOperation = () => {
    const { id } = useParams()
    const [type, setType] = useState("");
    const [id_repair, setIdRepair] = useState("");

    const [titleOperationForm, setTitleOperationForm] = useState("");
    const navigate = useNavigate();

    const saveOperation = (e) => {
        e.preventDefault();
        const operation = { type, id_repair };
        operationService.create(operation)
            .then((response) => {
                console.log("Operacion ha sido añadida.", response.data);
                navigate("/repairs");
            })
            .catch((error) => {
                console.log("Error en la creacion de una nueva operacion", error);
            });
    };

    useEffect(() => {
        setIdRepair(id);
        setTitleOperationForm("Crear Operacion");
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
            <h2> {titleOperationForm} </h2>
            <form>
                <FormControl fullWidth>
                    <TextField 
                     id="type"
                     label="Tipo de Operacion"
                     type="number"
                     value={type}
                     variant="standard"
                     onChange={(e) => setType(e.target.value)}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <TextField 
                      id="id_repair"
                      disabled
                      label="Id de la reparacion"
                      value={id_repair}
                      variant="standard"
                      onChange={(e) => setIdRepair(e.target.value)}
                    />
                </FormControl>

                <FormControl>
                    <br />
                    <Button
                      variant="contained"
                      color="info"
                      onClick={(e) => saveOperation(e)}
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

export default AddOperation;