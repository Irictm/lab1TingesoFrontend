import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import vehicleService from "../services/vehicle.service";
import { Box, Button, FormControl, TextField, alpha, MenuItem } from "@mui/material";
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';

const AddEditVehicle = () => {
    const { id } = useParams()
    const [patentNumber, setPatentNumber] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [type, setType] = useState("");
    const [fabricationDate, setFabricationDate] = useState("");
    const [motorType, setMotorType] = useState("");
    const [numberOfSeats, setNumberOfSeats] = useState("");
    const [mileage, setMileage] = useState("");

    const [titleVehicleForm, setTitleVehicleForm] = useState("");
    const navigate = useNavigate();

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

    const types = [
        {
            value: 'Sedan'
        },
        {
            value: 'Hatchback'
        },
        {
            value: 'SUV'
        },
        {
            value: 'Pickup'
        },
        {
            value: 'Furgoneta'
        }
    ];

    const motorTypes = [
        {
            value: 'Gasolina'
        },
        {
            value: 'Diesel'
        },
        {
            value: 'Hibrido'
        },
        {
            value: 'Electrico'
        }
    ];

    const saveVehicle = (e) => {
        e.preventDefault();

        const vehicle = { id, patentNumber, brand, model, type, fabricationDate, motorType, numberOfSeats, mileage };
        if (id) {
            vehicleService.update(vehicle)
            .then((response) => {
                console.log("Vehiculo actualizando.", response.data);
                navigate("/vehicles");
            })
            .catch((error) => {
                console.log("Error actualizando el vehiculo.", error);
            });
        } else {
            vehicleService.create(vehicle)
            .then((response) => {
                console.log("Vehiculo ha sido añadido.", response.data);
                navigate("/vehicles");
            })
            .catch((error) => {
                console.log("Error en la creacion de un nuevo vehiculo", error);
            });
        }
    };

    useEffect(() => {
        if (id) {
            setTitleVehicleForm("Editar Vehiculo");
            vehicleService.get(id).then((vehicle) => {
                setPatentNumber(vehicle.data.patentNumber);
                setBrand(vehicle.data.brand);
                setModel(vehicle.data.model);
                setType(vehicle.data.type);
                setFabricationDate(vehicle.data.fabricationDate);
                setMotorType(vehicle.data.motorType);
                setNumberOfSeats(vehicle.data.numberOfSeats);
                setMileage(vehicle.data.mileage);
            })
            .catch((error) => {
                console.log("Se ha producido un error.", error);
              });
        } else {
            setTitleVehicleForm("Crear Vehiculo");
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
            <h2> {titleVehicleForm} </h2>
            <form>
                <FormControl fullWidth>
                    <TextField 
                      id="patentNumber"
                      label="Numero de Patente"
                      value={patentNumber}
                      variant="standard"
                      onChange={(e) => setPatentNumber(e.target.value)}
                      helperText="Ej. ABCL24"
                    />
                </FormControl>

                <FormControl fullWidth>
                <TextField
                     id="brand"
                     select
                     label="Marca"
                     value={brand}
                     variant="standard"
                     onChange={(e) => setBrand(e.target.value)}
                     >
                        {brands.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.value}
                          </MenuItem>
                        ))}
                     </TextField>
                </FormControl>

                <FormControl fullWidth>
                    <TextField 
                     id="model"
                     label="Modelo"
                     value={model}
                     variant="standard"
                     onChange={(e) => setModel(e.target.value)}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <TextField 
                     id="type"
                     select
                     label="Tipo de Auto"
                     value={type}
                     variant="standard"
                     onChange={(e) => setType(e.target.value)}
                     >
                        {types.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.value}
                          </MenuItem>
                        ))}
                     </TextField>
                </FormControl>

                <FormControl fullWidth sx={{ mt: 2}}>
                    <TextField 
                     id="fabricationDate"
                     label="Fecha de Fabricacion"
                     type="date"
                     value={fabricationDate}
                     variant="standard"
                     onChange={(e) => setFabricationDate(e.target.value)}
                     InputLabelProps={{
                        shrink: true,
                      }}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <TextField 
                     id="motorType"
                     select
                     label="Tipo de Motor"
                     value={motorType}
                     variant="standard"
                     onChange={(e) => setMotorType(e.target.value)}
                     >
                        {motorTypes.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.value}
                          </MenuItem>
                        ))}
                     </TextField>
                </FormControl>

                <FormControl fullWidth>
                    <TextField 
                     id="numberOfSeats"
                     label="Numero de Asientos"
                     type="number"
                     value={numberOfSeats}
                     variant="standard"
                     onChange={(e) => setNumberOfSeats(e.target.value)}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <TextField 
                     id="mileage"
                     label="Kilometraje"
                     type="number"
                     value={mileage}
                     variant="standard"
                     onChange={(e) => setMileage(e.target.value)}
                    />
                </FormControl>

                <FormControl>
                    <br />
                    <Button
                      variant="contained"
                      color="info"
                      onClick={(e) => saveVehicle(e)}
                      style={{ marginLeft: "0.5rem" }}
                      startIcon={<SaveTwoToneIcon />}
                    >
                    Grabar
                    </Button>
                </FormControl>
            </form>
            <br />
            <Link to="/vehicles">Volver a la lista</Link>
            <br />
        </Box>
    );
};

export default AddEditVehicle;