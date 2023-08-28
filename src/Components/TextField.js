import React from 'react'
import { TextField } from '@mui/material'
import { useField } from 'formik';
const TextFieldWrapper = ({
    name,
    ...otherProps
}) => {

    const [field, meta] = useField(name);
    const configtextfield = {
        ...field,
        ...otherProps,
        fullWidth: true,
        variant:'outlined'
    };
    if (meta && meta.touched && meta.error) {
        configtextfield.error = true;
        configtextfield.helperText = meta.error;
    }
    return (
        <TextField {...configtextfield} />
    )
}

export default TextFieldWrapper
