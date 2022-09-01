import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';

export default function Product() {
    const paperStyle = {padding: '50px 20px', width: 600, margin: '20px auto'}

    const [description, setDescription] = useState('')
    const [state, setState] = useState('')
    const [products, setProducts] = useState([])

    const handleClick = (e) => {
        e.preventDefault()
        const product = {description, state}
        console.log(product)

        fetch('http://localhost:8080/product', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(product)
        }).then((r) => {
            console.log('Product has been added', r.text())
        })
    }

    useEffect(() => {
        fetch('http://localhost:8080/product')
            .then(r => r.json())
            .then(result => {
                setProducts(result)
            })
    }, [])

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{color: "blue"}}><u>Add Product</u></h1>

                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': {m: '5px auto'}
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" label="Product description" variant="outlined" fullWidth
                               value={description} onChange={(e) => setDescription(e.target.value)}/>
                    <TextField id="outlined-basic" label="Product status (0/1)" variant="outlined" fullWidth
                               value={state} onChange={(e) => setState(e.target.value)}/>
                </Box>

                <Button variant="contained" color="secondary" endIcon={<SendIcon/>} onClick={handleClick}>
                    Send
                </Button>
            </Paper>

            <h1>Products</h1>

            <Paper elevation={3} style={paperStyle}>
                {
                    products.map(product => (
                        <Paper elevation={6} style={{margin: '10px', padding: '15px', textAlign: 'left'}}
                               key={product.id}>
                            Id: {product.id}<br/>
                            Description: {product.description}<br/>
                            State: {product.state}
                        </Paper>
                    ))
                }
            </Paper>

        </Container>
    );
}
