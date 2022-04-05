import React from "react";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";

export default function Search({
  children,
  rootClassName,
  inputClassName,
  placeholder,
  inputProps,
}) {
  return (
    <Paper component="form" className={rootClassName}>
      <InputBase
        className={inputClassName}
        placeholder={placeholder}
        inputProps={inputProps}
      />
      {children}
    </Paper>
  );
}
