import React from 'react'; 
import {Box, Button, Flex, Link, Heading} from '@chakra-ui/react';
import Linker from "next/link";
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import isServer from '../utils/isServer';
import NextLink from "next/link";
import { useRouter } from 'next/router';


interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const router = useRouter();
    const [, logout] = useLogoutMutation();
    const [{data, fetching}] = useMeQuery();//me query gets user id and name so we can don't show login/register if user is logged in

  
    
    let body = null
    // 3 possibilities: data is loading
    if (fetching) {

        body = null;
    // user is not logged in
    } else if (!data?.me) {
        body = (
            <>
        <Linker href="/login">
        <Button mr={2} color='black'> Login </Button>
        </Linker>
        <Linker href="/register">
        <Button color='black'> Register </Button> 
        </Linker>
        </>

        )
    // user is logged in    
    } else {
        body = (
            <Flex>
         <Box fontSize='2xl' mr={4} fontStyle='italic'>Hi {data.me.username}!</Box> 
        <Button onClick={async () => {await logout(); router.reload()}} variant='outline' color='black' bg='lightblue'>Logout</Button>
        </Flex>

        );
    }
    return (
        <>
         <Flex  zIndex={1} position="sticky" top={0} bg='navy' p={8} pl={10} color='white' fontWeight='extrabold' fontSize='3xl'
        align="center">
            <NextLink href="/">
                <Link>
                <Heading>Reliv</Heading>
                </Link>
            </NextLink>
           
                <Box ml={'auto'}>
                    {body}
                </Box>
     
         </Flex>
    
        

       
        </>
    ); 

}