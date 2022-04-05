import { Box } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../kimbeli-logo-small.png";

const logoStyle = {
  height: "4ch",
  width: "auto",
};
const LogoSmallDevice = (props) => {
  return (
    <Box component={Link} to={"/"}>
      <img alt="Logo" src={logo} style={logoStyle} {...props} />
    </Box>
  );
};

export default LogoSmallDevice;