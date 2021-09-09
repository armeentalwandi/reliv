import { NavBar } from "../components/NavBar";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient} from 'next-urql'
import { UpdatePostDocument, useMeQuery, usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import NextLink from "next/link";
import {Box, Button, Flex, Heading, Stack, Text, Icon, IconButton, Link} from '@chakra-ui/react';
import React, { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon, EditIcon} from "@chakra-ui/icons";
import { UpdootSection } from "../components/UpdootSection";
import { useUpdatePostMutation } from "../generated/graphql";
import { EditButton } from "../components/EditButton";
import { Img } from "@chakra-ui/react"; 
import Image from "next/image";
import icecream from "./images/icecream.jpeg";
import girlsfield from "./images/girlsfield.jpeg";
import jumping from "./images/jumping.jpeg";
import airplane from "./images/airplane.jpeg";
import reading from "./images/reading.jpeg";
import girlssitting from "./images/girlssitting.jpeg";
import sunset from "./images/sunset.jpeg";
import carnival from "./images/carnival.jpeg";
import beach from "./images/beach.jpeg"; 
import travel from "./images/travel.jpeg"


const Index = () => {
    const [variables, setVariables] = useState({limit: 4, cursor: null as null | string})
    
    const [{data, fetching}] = usePostsQuery({
        variables,
    }); 
    
    if (!fetching && !data) {
        return <div> Make a post! </div>
    }
  const [,updatePost] = useUpdatePostMutation();

  
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
                 <Flex key={p._id} p={5}  shadow="md"
                 borderWidth="1px">
                     <UpdootSection post={p}/>
                     <Box>
                         <NextLink href="/post/[id]" as={`/post/${p._id}`}>
                             <Link> 
                             <Heading fontSize="xl">{p.title}</Heading>
                             </Link>
                         </NextLink>
                         
                        <Text>posted by {p.creator.username}</Text>
                         <Text mt={4}>{p.text.slice(0,50)+ "..."}</Text>
                         </Box>
                        <Box ml='auto'> 
                        <Box borderRadius="md">
                        {p.title.includes("Summer") ? 
                        <Image id="require-static" src={icecream}  height="200px" width="300px"/>
                    : p.title.includes("Paris") ?
                    <Image  id="require-static" src={girlssitting}  height="200px" width="300px"/>
                    
                    : p.title.includes("Nature") ? 
                    <Image id="require-static" src={jumping}  height="300px" width="300px"/>
                    
                    : p.title.includes("beach") ? 
                    <Image id="require-static" src={beach}  height="200px" width="200px"/>
                    
                    : p.title.includes("sun") ? 
                    <Image id="require-static" src={sunset}  height="200px" width="200px"/>
                    
                    : p.title.includes("carnival") ? 
                    <Image id="require-static" src={carnival}  height="150px" width="150px"/>
               
                    : p.title.includes("Flying") ? 
                    <Image id="require-static" src={airplane}  height="200px" width="200px"/>
                   
                    : p.title.includes("park") ? 
                    <Image id="require-static" src={girlsfield}  height="100px" width="100px"/>
                    
                    : p.title.includes("Reading") ? 
                    <Image id="require-static" src={reading}  height="100px" width="100px"/>
                    
                    : p.title.includes("exploring") ? 
                    <Image id="require-static" src={travel}  height="100px" width="100px"/>
                    
                    : null
                }
                        
                        
                        </Box>
                        
                       <EditButton _id = {p._id} creatorId={p.creator._id}/>
                      </Box> 
                    
                 
               </Flex>))}
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


