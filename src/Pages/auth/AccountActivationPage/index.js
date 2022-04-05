import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { verify } from "../../../store/actions/auth";
import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';
import Page from '../../../components/Page';
import { connect } from "react-redux";

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
  googleButton: {
    backgroundColor: theme.palette.common.white,
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

const AccountActivationPage = ({ verify, match }) => {
  const classes = useStyles();
  const [verified, setVerified] = useState(false);

  const verify_account = (e) => {
    const uid = match.params.uid;
    const token = match.params.token;

    verify(uid, token);
    setVerified(true);
  };

  if (verified) {
    return <Redirect to="/becominginstructor" />;
  }
  return (
    <Page
      className={classes.root}
      title="Account Activation"
    >
      <Container
        className={classes.cardContainer}
        maxWidth="sm"
      >

        <Card>
          <CardContent className={classes.cardContent}>
            <Box
              flexGrow={1}
              mt={3}
            >
                <Container maxWidth="md">
                  <Box
                    alignItems="center"
                    display="flex"
                    justifyContent="center"
                    mt={10}
                  >
                    <div>
                      <Typography color="textPrimary" gutterBottom variant="h2">
                      Activation du compte
                    </Typography>
                      <Typography variant="body2" color="textSecondary">
                      Activez votre compte:
                     </Typography>
                    </div>
                  </Box>
                  <Box
                    alignItems="center"
                    display="flex"
                    justifyContent="center"
                    mt={2}
                  >
                    <Button
                      color="primary"
                      onClick={verify_account}
                      // fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Activer
                      </Button>
                  </Box>
                </Container>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};
export default connect(null, { verify })(AccountActivationPage);

