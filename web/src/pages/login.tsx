import React from 'react';
import { Form, Formik } from 'formik';
import { FormControl, FormLabel, FormErrorMessage, Input, Box, Button, Heading, Link, Flex } from "@chakra-ui/react";
import { valueScaleCorrection } from 'framer-motion/types/render/dom/projection/scale-correction';
import {Wrapper} from '../components/Wrapper';
import {InputField} from '../components/inputField';
import {useMutation}  from 'urql';
import {useLoginMutation} from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import NextLink from 'next/link';





const Login: React.FC<{}> = ({}) => {
    const router = useRouter(); // so we can go to another page if registration successful

    const [,login] = useLoginMutation();
    return (
        // formik helps with handling form submissions and validating imputs

        // saving the form's initial values
        // Wrapper changes the size of the text field
        <Wrapper variant='small'>
            <Formik initialValues={{username: "", password: ""}} onSubmit={async (values, {setErrors}) => {
            console.log(values); // this logs the values submitted in the form (username, password)
            const response = await login({options: values});
            if (response.data?.login.errors) {
                setErrors(toErrorMap(response.data.login.errors));
            } else if (response.data?.login.user) { //optional chain
                // worked
                router.push("/"); // goes back to the home page if it worked
            }
       }}> 
            {({ isSubmitting }) =>(
                <Form>
                    <Box textAlign="center">
                        <Heading>Login</Heading>
                    </Box>
                    <InputField name="username" placeholder="username" label="Username"/>
                    <Box mt={2}>
                        <InputField name="password" placeholder="password" label="Password" type="password"/>
                    </Box>
                    
                    <Flex mt={2}>
                        <NextLink href="/forgot-password">
                            <Link ml='auto' color='black'>forgot password?</Link>
                            
                        </NextLink>
                    </Flex>
                    
                    <Button mt={3} type="submit" isLoading={isSubmitting} colorScheme="blue">Login</Button>
                    
                </Form>

            )}
        </Formik>

        </Wrapper>
        // isLoading will allow for it to load before submitting it.
        
    );
};
export default withUrqlClient(createUrqlClient)(Login);

