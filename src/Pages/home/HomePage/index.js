import React from "react";
import { makeStyles } from "@material-ui/core";
import Page from "../../../components/Page";



const useStyles = makeStyles(() => ({
  root: {},
}));
const HomeView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root}
     title="Cliq 'n' Eat"
     >
      ghhhhhhhhhhhhhhhhhhhhhhhhhhhh
    </Page>
  );
};

export default HomeView;
