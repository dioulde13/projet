import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Container,

  Typography,
  makeStyles
} from '@material-ui/core';
import Page from '../../../components/Page';
import ResetPasswordConfirmForm from './ResetPasswordConfirmForm';
import *as constant from '../../../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
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
    height: 30,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  cardContainer: {
    paddingBottom: 80,
    paddingTop: 80,
  },
  cardContent: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    minHeight: 400
  },
  currentMethodIcon: {
    height: 40,
    '& > img': {
      width: 'auto',
      maxHeight: '100%'
    }
  }
}));

const ResetPasswordConfirmPage = ({match}) => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Réinitialiser le mot de passe"
      content="Réinitialiser le mot de passe sur la Plateforme Plaguifor"
    >
      <Container
        className={classes.cardContainer}
        maxWidth="sm"
      >
        <Card>
          <CardContent className={classes.cardContent}>
            <Box
              alignItems="center"
              display="flex"
              justifyContent="space-between"
              mb={3}
            >
              <div>
                <Typography
                  color="textPrimary"
                  gutterBottom
                  variant="h2"
                >
                  {constant.R_MPASS}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                >
                  {constant.DETAIL_R_MPASS}
                </Typography>
              </div>
            </Box>
            <Box
              flexGrow={1}
              mt={3}
            >
              <ResetPasswordConfirmForm match={match} />
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};

export default ResetPasswordConfirmPage;
