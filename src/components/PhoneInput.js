import React, { forwardRef } from 'react'
import TextField from '@material-ui/core/TextField'



const phoneInput = (props, ref) => {

  return (

    <TextField
      {...props}
      // InputProps={{
      //   className: classes.input
      // }}
      inputRef={ref}
      fullWidth
      size='small'
      label='Téléphone'
      variant='outlined'
      name='phone'
    />
  )
}
export default forwardRef(phoneInput)