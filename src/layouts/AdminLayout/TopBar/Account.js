import React, { useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { grey } from '@material-ui/core/colors';

import {
  Avatar,
  Box,
  ButtonBase,
  Hidden,
  Menu,
  MenuItem,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { logout } from "../../../store/actions/auth";
import { useSelector } from "../../../store";
import { connect } from "react-redux";
// import useAuth from 'src/hooks/useAuth';

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 32,
    width: 32,
    marginRight: theme.spacing(1),
    color:"black",
  },
  popover: {
    width: 200,
  },
  
}));

const Account = ({ logout }) => {
  const classes = useStyles();
  const history = useHistory();
  const ref = useRef(null);
  // const { user, logout } = useAuth();
  const { user } = useSelector((state) => state.auth);
  const { enqueueSnackbar } = useSnackbar();
  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      handleClose();
      await logout();
      history.push("/");
    } catch (err) {
      enqueueSnackbar("Unable to logout", {
        variant: "error",
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        component={ButtonBase}
        onClick={handleOpen}
        ref={ref}
      >
        <Avatar
          alt="User"
          className={classes.avatar}
          src={user?user.photo:''}
        />
        <Hidden smDown>
          <Typography variant="h5" className={classes.username}>
            {user?user.first_name +" "+ user.last_name:""}
          </Typography>
        </Hidden>
      </Box>
      <Menu
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        keepMounted
        PaperProps={{ className: classes.popover }}
        getContentAnchorEl={null}
        anchorEl={ref.current}
        open={isOpen}
      >
        {/* <MenuItem
          component={RouterLink}
          onClick={handleClose}
          to="/dashboard/profile"
        >
          Profile
        </MenuItem> */}
        <MenuItem component={RouterLink} onClick={handleClose} to="/dashboard/account">
          Account
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default connect(null, { logout })(Account);
