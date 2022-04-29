import * as React from 'react';

import {
  Card,
  CardContent,
  Container,
  TextField
} from '@material-ui/core';
import {
  Button,
  Typography,
  Grid,
  Box,
  makeStyles
} from "@material-ui/core";
import "react-phone-number-input/style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '50vh'
  },
  banner: {
    backgroundColor: theme.palette.background.paper,
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  bannerChip: {
    marginRight: theme.spacing(2)
  },
  methodIcon: {
    height: 10,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  cardContainer: {
    paddingBottom: 20,
    paddingTop: 80,
  },
  cardContent: {
    // padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    minHeight: 100
  },
  currentMethodIcon: {
    height: 40,
    '& > img': {
      width: 'auto',
      maxHeight: '100%'
    }
  }
}));

const SearhUser = ({email, setResult, handleChange}) => {

  const handleSearch = () => {
      setResult(email)
  }

  const classes = useStyles();

  return (
    <div>
      <Container
        className={classes.cardContainer}
        maxWidth="sm"
      >
        <Card>
          <CardContent className={classes.cardContent}>
            
                <TextField
                  name="email"
                  value={email}
                  onChange={handleChange}
                  variant="outlined"
                  label="email"
                />
                <Box pt={3}/>
                <Button
                  onClick={handleSearch}
                  style={{
                   // marginRight:"10px",
                    height: "100%",
                    backgroundColor: "black",
                    color: "white",
                  }}
                >
                 Search
                </Button>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
export default SearhUser;