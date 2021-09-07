import { NavBar } from "../components/NavBar";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient} from 'next-urql'
import { usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import NextLink from "next/link";
import {Box, Button, Flex, Heading, Icon, Stack, Text} from '@chakra-ui/react';
import React, { useState } from "react";

const Index = () => {
    const [variables, setVariables] = useState({limit: 15, cursor: null as null | string})
    const [{data, fetching}] = usePostsQuery({
        variables,
    }); 
    
    if (!fetching && !data) {
        return <div> Make a post! </div>
    }


    return (
        <Layout>
            <Flex>
            <NextLink href="/create-post">
                <Button ml='auto' color='black'>Create Post</Button>
            </NextLink>
            </Flex>
        <br/>

       {!data && fetching ? (<div>Loading Posts ...</div>)
       : (
           <Stack spacing={10} >
           {data!.posts.posts.map((p) => (
                 <Box key={p._id} p={5}  shadow="md"
                 borderWidth="1px">
                     <Icon name="chevron-up" size="24px"/>
                     <Icon name="chevron-down" size="24px"/>
                 <Heading fontSize="xl">{p.title}</Heading>
                 
                 <Text mt={4}>{p.text}</Text>
               </Box>))}
           </Stack>
       )} 
      {data && data.posts.hasMore ? (<Flex>
       <Button onClick={() => {
           setVariables({
               limit: variables.limit, 
               cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
           });
        }}
           isLoading={fetching} my={8} m='auto'> Load more </Button>
       </Flex>) : null}
       
        </Layout>



    );
};


export default withUrqlClient(createUrqlClient, {ssr: true})(Index); 


