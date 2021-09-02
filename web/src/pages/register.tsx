import React from 'react';
import { Form, Formik } from 'formik';
import { Box, Button, Heading } from "@chakra-ui/react";
import {Wrapper} from '../components/Wrapper';
import {InputField} from '../components/inputField';
import {useRegisterMutation} from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';


interface registerProps {}


const Register: React.FC<registerProps> = ({}) => {
    const router = useRouter(); // so we can go to another page if registration

    const [,register] = useRegisterMutation();
    return (
        // formik helps with handling form submissions and validating imputs

        // saving the form's initial values
        // Wrapper changes the size of the text field
        <Wrapper variant='small'>
            <Formik initialValues={{username: "", password: "", email:""}} onSubmit={async (values, {setErrors}) => {
            console.log(values); // this logs the values submitted in the form (username, password)
            const response = await register(values);
            if (response.data?.register.errors) {
                setErrors(toErrorMap(response.data.register.errors));
            } else if (response.data?.register.user) { //optional chain
                // worked
                router.push("/"); // goes back to the home page if it worked
            }
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
export default withUrqlClient(createUrqlClient)(Register);

