import React, { useState } from "react";
import { Form, Formik } from 'formik';
import { FormControl, FormLabel, FormErrorMessage, Input, Box, Button, Heading, Link, Flex } from "@chakra-ui/react";
import { valueScaleCorrection } from 'framer-motion/types/render/dom/projection/scale-correction';
import {Wrapper} from '../components/Wrapper';
import {InputField} from '../components/inputField';
import {useMutation}  from 'urql';
import {useForgotPasswordMutation, useLoginMutation} from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import NextLink from 'next/link';
import login from "./login";

const ForgotPassword: React.FC<{}> = ({}) => {
    const [complete, setComplete] = useState(false);
    const [, forgotPassword] = useForgotPasswordMutation();
    return (
        <Wrapper variant='small'>
        <Formik initialValues={{email: ""}} onSubmit={async (values) => {
         await forgotPassword(values);
        setComplete(true);
        
   }}> 
        {({ isSubmitting }) => 
        complete ? (
            <Box>if an account with that email exists, we sent you can email.</Box>
        ) : (
            <Form>
            <InputField
              name="email"
              placeholder="email"
              label="Email"
              type="email"
            />
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              forgot password
            </Button>
          </Form>

        )}
    </Formik>

    </Wrapper>
    )
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
