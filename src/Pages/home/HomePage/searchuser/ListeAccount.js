import React from 'react'
import { styled } from '@mui/system';
import TablePaginationUnstyled from '@mui/base/TablePaginationUnstyled';
import {
    Box,
    Paper,
    Button,
    Container
} from "@material-ui/core";
import Modal from './Modal'
import { Link as ReactRouteLink } from "react-router-dom";

const Root = styled('div')`
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid #ddd;
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: #ddd;
  }
`;


const Rechargement = ({ emlploye }) => {
    console.log(emlploye);
    const [open, setOpen] = React.useState(false);

    const [emlplo, setEmploye] = React.useState(false);

    const handleClickOpendelete = (emlplo) => {
        setEmploye(emlplo);
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };

    return (

        <Container>
            <Box mt={2} />
            <Modal  handleClose={handleClose} open={open} emlplo={emlplo}/>

            <Root sx={{ maxWidth: '100%' }}>
                <table aria-label="custom pagination table">
                    <Paper >
                        <thead>
                            <tr>
                                <th align="center">Name</th>
                                <th align="center">membership number</th>
                                <th align="center">email</th>
                                <th align="center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ fontSize: 14 }}>
                                <td style={{ width: 400 }} align="right">
                                    {emlploye[0]?.first_name} - {emlploye[0]?.last_name}
                                </td>
                                <td style={{ width: 400 }} align="right">
                                    {emlploye[0]?.membership_number}
                                </td>
                                <td style={{ width: 400 }} align="right">
                                    {emlploye[0]?.email}
                                </td>
                                <td style={{ width: 400 }} align="right">
                                    <Box display="flex">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleClickOpendelete(emlploye[0]?.id)}
                                            style={{ marginLeft: "10px", backgroundColor: "red" }}
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            component={ReactRouteLink} to={`/changeemail`}
                                            style={{ marginLeft: "10px", backgroundColor: "blue" }}
                                        >
                                            Change
                                        </Button>
                                    </Box>
                                </td>
                            </tr>
                        </tbody>
                    </Paper>
                </table>
            </Root>
        </Container>
    );
}

export default Rechargement;