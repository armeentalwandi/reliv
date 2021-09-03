import React, { useEffect } from 'react';
import {ReactNode, useRef} from 'react';
import { Wrapper } from '../components/Wrapper';
import { Formik, Form } from 'formik';
import login from './login';
import { toErrorMap } from "../utils/toErrorMap";
import { InputField } from "../components/inputField";
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Icon, InputGroup, Textarea } from "@chakra-ui/react";
import { FiFile } from 'react-icons/fi';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';
import { useCreatePostMutation, useMeQuery } from "../generated/graphql";
import { useRouter } from 'next/router';
import { createUrqlClient } from '../utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';
import { Layout } from '../components/Layout';
import Router from 'next/router';
import { useIsAuth } from '../utils/useIsAuth';


const CreatePost: React.FC<{}> = ({}) => {
     
    const router = useRouter();
    useIsAuth(); // checks if you are logged in or not and redirects you based on that
  const [, createPost] = useCreatePostMutation();
    return (
        <Layout variant="small">
            <Formik initialValues={{title: "", text: ""}} 
            onSubmit={async (values) => {
                //console.log(values); 
                const { error } = await createPost({input: values});
                console.log(error);
                if (!error) {
                    router.push("/");
                }
               // if there is an error, user will be pushed to the login page
            }}
            > 
            {({ isSubmitting }) =>(
                <Form>
                    <InputField name="title" placeholder="title" label="Title"/>
                    <Box mt={4}>
                        <Textarea name="text" placeholder="text..." label="Body"/>
                    </Box>
                    <Box mt={4}>
                        <InputField name="photo" placeholder="Photo" type="File" label="Photo"/>
                    </Box>
                    <Button mt={4} type="submit" isLoading={isSubmitting} colorScheme="blue">Create Post</Button>
                    
                </Form>

            )}
        </Formik>

        </Layout>
    );
}

export default withUrqlClient(createUrqlClient)(CreatePost);