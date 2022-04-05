import * as React from 'react';
import { styled } from '@mui/system';
import TablePaginationUnstyled from '@mui/base/TablePaginationUnstyled';
import { Box, Button, InputBase, IconButton, Grid } from "@material-ui/core";
import Paper from "@mui/material/Paper";
import { Search as SearchIcon } from "react-feather";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";

function createData(name, calories, fat) {
    return { name, calories, fat };
}

const rows = [
    createData('Mamadou', 'Balde', 'Mamadou@gmail.com'),
    createData('Ibrahima', 'Diallo', 'Ibrahima@gmail.com'),
    createData('Sory', 'Sow', 'Sory@gmail.com'),
    createData('Saidou', 'Diallo', 'Saidou@gmail.com'),
    createData('Amadou', 'Sow', 'Amadou@gmail.com'),
    createData('Abdoulaye', 'Diallo', 'Abdoulaye@gmail.com'),
    createData('Ice cream sandwich', 237, 9.0),
    createData('Jelly Bean', 375, 0.0),
    createData('KitKat', 518, 26.0),
    createData('Lollipop', 392, 0.2),
    createData('Marshmallow', 318, 0),
    createData('Nougat', 360, 19.0),
    createData('Oreo', 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

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

const CustomTablePagination = styled(TablePaginationUnstyled)`
  & .MuiTablePaginationUnstyled-toolbar {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .MuiTablePaginationUnstyled-selectLabel {
    margin: 0;
  }

  & .MuiTablePaginationUnstyled-displayedRows {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .MuiTablePaginationUnstyled-spacer {
    display: none;
  }

  & .MuiTablePaginationUnstyled-actions {
    display: flex;
    gap: 0.25rem;
  }
`;

const ListeAccount = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const history = useHistory();

    const [searched, setSearched] = React.useState("");
    const handleClickOpen = () => {
        history.push("/createaccount");
    };

    const handleClickchange = () => {
        history.push("/changeemail");
    };
    const handleClickdelete = () => {
        history.push("/deleteuser");
    };
    return (
        <Root sx={{ maxWidth: '100%', width: "100%" }}>
           
            <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClickOpen}
                        style={{ marginLeft: "10px" }}
                    >
                        <AddIcon /> Create
                    </Button>
                </Grid>
                <Grid item sm={6} xs={12}>
                <Box pb={2}>
                    <Paper component="form">
                        <IconButton type="submit" aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            value={searched}
                            placeholder="Search User"
                            onChange={(event) => {
                                setSearched(event.target.value);
                            }}
                        />
                    </Paper>
                    </Box>
                </Grid>
            </Grid>
             
            <table aria-label="custom pagination table">
                <thead>
                    <tr>
                        <th>Fist Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {(rowsPerPage > 0
                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : rows
                    ).map((row) => (
                        <tr key={row.name}>
                            <td>{row.name}</td>
                            <td style={{ width: 160 }} align="right">
                                {row.calories}
                            </td>
                            <td style={{ width: 160 }} align="right">
                                {row.fat}
                            </td>
                            <td style={{ width: 160 }} align="right">
                                <Box display="flex"> 
                                    <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleClickdelete}
                                    style={{ marginLeft: "10px", backgroundColor: "red" }}
                                >
                                    Delete
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleClickchange}
                                    style={{ marginLeft: "10px", backgroundColor: "blue" }}
                                >
                                    Change
                                </Button>
                                </Box>

                            </td>
                        </tr>
                    ))}

                    {emptyRows > 0 && (
                        <tr style={{ height: 41 * emptyRows }}>
                            <td colSpan={4} />
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <CustomTablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={4}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            componentsProps={{
                                select: {
                                    'aria-label': 'rows per page',
                                },
                                actions: {
                                    showFirstButton: true,
                                    showLastButton: true,
                                },
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </tr>
                </tfoot>
            </table>
        </Root>
    );
}
export default ListeAccount;