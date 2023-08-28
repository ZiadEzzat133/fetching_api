import React from 'react'
import { Button } from '@mui/material'
import { useFormikContext } from 'formik'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ButtonWrapper = ({
    name,
    ...otherProps
}) => {
    const { submitForm } = useFormikContext();
    const handlesubmit = () => {
        submitForm();
    }
    const configbutton =
    {
        type:'submit',
        variant: 'contained',
        color: 'primary',
        onSubmit: handlesubmit,
    }
    return (
        <div>
            <Button className='mybtn'{...configbutton}>
                {name}
            </Button>
            <ToastContainer />
        </div>
    )
}

export default ButtonWrapper
