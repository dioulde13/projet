import React from "react";
import Box from "@material-ui/core/Box";

export default function Jumbotron({ children, className }) {
  //const classes = useStyles();

  return <Box className={className}>{children}</Box>;
}
