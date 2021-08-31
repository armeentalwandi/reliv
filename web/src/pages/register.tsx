import React from 'react';
import { Form, Formik } from 'formik';
import { FormControl, FormLabel, FormErrorMessage, Input, Box, Button, Heading } from "@chakra-ui/react";
import { valueScaleCorrection } from 'framer-motion/types/render/dom/projection/scale-correction';
import Wrapper from '../components/Wrapper';
import InputField from '../components/inputField';


interface resgisterProps {}



const Register: React.FC<resgisterProps> = ({}) => {
    return (
        // formik helps with handling form submissions and validating imputs

        // saving the form's initial values
        // Wrapper changes the size of the text field
        <Wrapper variant='small'>
            <Formik initialValues={{username: "", password: ""}} onSubmit={(values) => {
            console.log(values); // this logs the values submitted in the form (username, password)
        }}> 
            {({ isSubmitting }) =>(
                <Form>
                    <Box textAlign="center">
                        <Heading>Register</Heading>
                    </Box>
                    <InputField name="username" placeholder="username" label="Username"/>
                    <Box mt={2}>
                        <InputField name="password" placeholder="password" label="Password" type="password"/>
                    </Box>
                    <Box mt={2}>
                        <InputField name="email" placeholder="email@gmail.com" label="Email" type="email"/>
                    </Box>
                    
                    <Button mt={3} type="submit" isLoading={isSubmitting} colorScheme="blue">Register</Button>
                    
                </Form>

            )}
        </Formik>

        </Wrapper>
        // isLoading will allow for it to load before submitting it.
        
    );
};
export default Register;

