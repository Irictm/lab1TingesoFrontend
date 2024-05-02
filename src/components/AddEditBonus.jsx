import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import bonusService from "../services/bonus.service";
import { Box, Button, FormControl, TextField, alpha, MenuItem } from "@mui/material";
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';

const AddEditBonus = () => {
    const { id } = useParams()
    const [amount, setAmount] = useState("");
    const [brand, setBrand] = useState("");
    const [numberRemaining, setNumberRemaining] = useState("");

    const [titleBonusForm, setTitleBonusForm] = useState("");
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

    const saveBonus = (e) => {
        e.preventDefault();

        const bonus = { id, amount, brand, numberRemaining };
        if (id) {
            bonusService.update(bonus)
            .then((response) => {
                console.log("Bonus actualizando.", response.data);
                navigate("/bonus");
            })
            .catch((error) => {
                console.log("Error actualizando el bonus.", error);
            });
        } else {
            bonusService.create(bonus)
            .then((response) => {
                console.log("Bonus ha sido añadido.", response.data);
                navigate("/bonus");
            })
            .catch((error) => {
                console.log("Error en la creacion de un nuevo bonus", error);
            });
        }
    };

    useEffect(() => {
        if (id) {
            setTitleBonusForm("Editar Bonus");
            bonusService.get(id).then((bonus) => {
                setAmount(bonus.data.amount);
                setBrand(bonus.data.brand);
                setNumberRemaining(bonus.data.numberRemaining);
            })
            .catch((error) => {
                console.log("Se ha producido un error.", error);
              });
        } else {
            setTitleBonusForm("Crear Bonus");
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
            <h2> {titleBonusForm} </h2>
            <form>
                <FormControl fullWidth>
                    <TextField 
                      id="amount"
                      label="Monto"
                      value={amount}
                      type="number"
                      variant="standard"
                      onChange={(e) => setAmount(e.target.value)}
                      helperText="Ej. 10000"
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
                     helperText="Ej. Toyota"
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
                     id="numberRemaining"
                     label="Cantidad Restante"
                     type="number"
                     value={numberRemaining}
                     variant="standard"
                     onChange={(e) => setNumberRemaining(e.target.value)}
                    />
                </FormControl>

                <FormControl>
                    <br />
                    <Button
                      variant="contained"
                      color="info"
                      onClick={(e) => saveBonus(e)}
                      style={{ marginLeft: "0.5rem" }}
                      startIcon={<SaveTwoToneIcon />}
                    >
                    Grabar
                    </Button>
                </FormControl>
            </form>
            <br />
            <Link to="/bonus">Volver a la lista</Link>
            <br />
        </Box>
    );
};

export default AddEditBonus;