/* eslint-disable no-use-before-define */
import React, { useCallback, useState, useEffect } from "react";
import { useLocation, matchPath } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import useIsMountedRef from "../../../hooks/useIsMountedRef";
import axios from "axios";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  Link,
  List,
  ListSubheader,
  Typography,
  makeStyles,
} from "@material-ui/core";
import {
  Lock as LockIcon,
  UserList as UserListIcon,
  UserPlus as UserPlusIcon,
  AlertCircle as AlertCircleIcon,
  User as UserIcon,
  UserMinus as UserMoinsIcon,
  UserCheck as UserCheckIcon,
} from "react-feather";

import Logo from "../../../components/Logo";
import NavItem from "./NavItem";
import { useSelector } from "../../../store";
import { connect } from "react-redux";
import { logout } from "../../../store/actions/auth";
import * as constant from "../../../constants";

const sections = [
  {
    subheader: "Compte",
    items: [
      {
        title: "Search Accout",
        href: "/searchuser",
        icon: UserCheckIcon,
      },
      {
        title: "Create Accout",
        href: "/createaccount",
        icon: UserPlusIcon,
      },
      {
        title: "Change Email",
        href: "/changeemail",
        icon: UserIcon,
      },
    ],
  },
];

function renderNavItems({ items, pathname, depth = 0 }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, pathname, depth }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({ acc, pathname, item, depth }) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false,
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items,
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        info={item.info}
        key={key}
        title={item.title}
      />
    );
  }

  return acc;
}

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: "calc(100% - 64px)",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const isMountedRef = useIsMountedRef();

  const [setProjects] = useState();
  const getProjects = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/trainers`
      );
      if (isMountedRef.current) {
        setProjects(response.data);
      }
    } catch (err) {
    }
  }, [isMountedRef]);
  useEffect(() => {
    getProjects();
  }, [getProjects]);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Hidden lgUp>
          <Box p={2} display="flex" justifyContent="center" bgcolor="#210557">
            <RouterLink to="/searchuser">
              <Logo />
            </RouterLink>
          </Box>
        </Hidden>
        <Box pt={4}>
          <Box display="flex" justifyContent="center">
            <RouterLink to="/searchuser">
              <Avatar
                alt="User"
                className={classes.avatar}
                src={user ? user.photo : ""}
              />
            </RouterLink>
          </Box>
          <Box mt={2} textAlign="center">
            <Link
              component={RouterLink}
              to="/listeaccount"
              variant="h5"
              color="textPrimary"
              underline="none"
            >
              {user ? user.first_name + " " + user.last_name : ""}
            </Link>
            <Typography variant="body2" color="textSecondary">
              {user ? user.profession : ""}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box p={2}>
          {sections.map((section) => (
            <List
              key={section.subheader}
              subheader={
                <ListSubheader disableGutters disableSticky>
                  {section.subheader}
                </ListSubheader>
              }
            >
              {renderNavItems({
                items: section.items,
                pathname: location.pathname,
              })}
            </List>
          ))}
        </Box>
        <Divider />
        <Box p={2}>
          <Box p={2} borderRadius="borderRadius" bgcolor="background.dark">
            <Typography variant="h6" color="textPrimary">
              {constant.B_AIDE}
            </Typography>
            <Box mt={2} />
            <Typography variant="h6" color="textPrimary">
              {constant.DETAIL_B_AIDE}
            </Typography>
            <Box />
            <Typography variant="h6" color="textPrimary">
              {constant.DETAIL_B_AIDE1}
            </Typography>
          </Box>
        </Box>
      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default connect(null, { logout })(NavBar);
