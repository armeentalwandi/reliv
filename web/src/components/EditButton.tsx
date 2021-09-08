import { Box, IconButton, Link } from '@chakra-ui/react';
import React from 'react';
import NextLink from "next/link";
import {EditIcon} from "@chakra-ui/icons";
import { useMeQuery } from '../generated/graphql';

interface EditButtonProps {
    _id: number;
    creatorId: number;
}
export const EditButton: React.FC<EditButtonProps> = ({
    _id,
    creatorId,
}) => {

    const [{data:meData}] = useMeQuery();

    if (meData?.me?._id !== creatorId) {
        return null;
    } 
    return (
        
        <Box> 
            <NextLink href='/post/edit/[_id]' as={`/post/edit/${_id}`}>
                <IconButton as={Link} mr={4} ml="auto" icon={<EditIcon/>} aria-label="Edit Post"/>
            </NextLink>
        </Box>
    );
};