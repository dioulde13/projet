import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from '../../../../components/Page';
import ChangeEmail from './ChangeEmail';

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

const RegisterView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="S'enregistrer"
      content="Enregistrer sur la Plateforme Plaguifor"
    >
      <Container
        className={classes.cardContainer}
        maxWidth="sm"
      >
        <Card>
          <CardContent className={classes.cardContent}>
           
            <Box
              flexGrow={1}
              // mt={3}
            >
              <ChangeEmail/>
            </Box>  
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};

export default RegisterView;
