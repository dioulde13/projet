import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  Link,
  Typography,
  makeStyles,
  Avatar
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {},
  name: {
    marginTop: theme.spacing(1)
  },
  avatar: {
    height: 100,
    width: 100
  }
}));

const ProfileDetails = ({ className, user, user_profile_picture, ...rest }) => {
  const classes = useStyles();
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          textAlign="center"
        >
          <Avatar
                alt="User"
                className={classes.avatar}
                src={user?user.photo:null}
              />
          {/* <FileDropzone user_profile_picture={user?user.photo:null}/> */}
          <Typography
            className={classes.name}
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {user?user.first_name +" "+ user.last_name:""}
          </Typography>
          <Typography
            color="textPrimary"
            variant="body1"
          >
            {/* Selectionner votre photo */}
            {' '}
            <Link
              component={RouterLink}
              to="/pricing"
            >
              {/* {user.tier} */}
            </Link>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default ProfileDetails;
