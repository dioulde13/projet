import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  // Link,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Page from "../../../components/Page";
import Logo from "../../../components/Logo";
import LoginForm from "./LoginForm";
import * as constant from "../../../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  banner: {
    backgroundColor: theme.palette.background.paper,
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  bannerChip: {
    marginRight: theme.spacing(2),
  },
  methodIcon: {
    height: 30,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  cardContent: {
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    minHeight: 400,
  },
  currentMethodIcon: {
    height: 40,
    "& > img": {
      width: "auto",
      maxHeight: "100%",
    },
  },
  cardContainer: {
    paddingBottom: 80,
    paddingTop: 80,
  },
}));

const LoginPage = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Créer un compte - PLAGUIFOR: Plateforme Guinéenne de Formations"
      content="Se connecter à la Plateforme Plaguifor"
    >
      <Container className={classes.cardContainer} maxWidth="sm">
        <Card>
          <CardContent className={classes.cardContent}>
            <Box
              alignItems="center"
              display="flex"
              justifyContent="space-between"
              mb={3}
            >
              <div>
                <Typography variant="h3" color="textPrimary">
                  {constant.CONNECTEZ_VOUS}
                </Typography>
              </div>
            </Box>
            <Box flexGrow={1} mt={3}>
              <LoginForm />
            </Box>
            <Box my={3}>
              <Divider />
            </Box>

            <Box display="flex" justifyContent="space-between" py={1.5}>
              <Link
                // component={RouterLink}
                to="/reset-password"
                variant="body2"
                color="textSecondary"
              >
               {constant.PSWORD_OUBLIE}
              </Link>
              <Link
                // component={RouterLink}
                to="/register"
                variant="body2"
                color="textSecondary"
              >
                {constant.INSCRIT_COURS}
              </Link>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};

export default LoginPage;
