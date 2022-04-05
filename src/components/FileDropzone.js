import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Avatar,
  makeStyles
} from '@material-ui/core';
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};
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

function FileDropzone(props) {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const thumbs = (
    <div style={thumb} >
      <div style={thumbInner}>
        <img
          src={props.user_profile_picture?props.user_profile_picture:""}
          style={img}
        />
      </div>
    </div>
  );

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        {/* <input {...getInputProps()} /> */}
        <Avatar
          className={classes.avatar}
        >
        <aside style={thumbsContainer}>
          {thumbs}
        </aside>
       </Avatar>
      </div>
    </section>
  );
}

export default FileDropzone;
