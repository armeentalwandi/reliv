import React, { useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon} from "@chakra-ui/icons";
import {Flex, IconButton } from '@chakra-ui/react';
import { PostsQuery, useVoteMutation, VoteMutationVariables } from "../generated/graphql";
interface UpdootSectionProps {
    post: PostsQuery['posts']['posts'][0]

}

export const UpdootSection: React.FC<UpdootSectionProps> = ({post}) => {
    const [loadingState, setLoadingState] = useState <
    "updoot-loading" | "downdoot-loading" | "not-loading">("not-loading");
    const [,vote] = useVoteMutation();
    console.log();
    return (
        <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
        <IconButton onClick={async () => {
            if (post.voteStatus === 1) {
                return;
            }
            setLoadingState("updoot-loading");
            await vote({postId: post._id, value: 1}); setLoadingState("not-loading");
        }} isLoading={loadingState === "updoot-loading"} aria-label="upvote" icon={<ChevronUpIcon />} fontSize="25px" variant={post.voteStatus === 1 ? undefined : "outline"} colorScheme={post.voteStatus === 1 ? "green" : "blue"} size="sm"/>
           {post.points}
           <IconButton onClick={async () => {
               if (post.voteStatus === -1) {
                   return;
               }
               setLoadingState("downdoot-loading");
               await vote({postId: post._id, value: -1}); setLoadingState("not-loading");
               }} isLoading={loadingState === "downdoot-loading"}aria-label="downvote" icon={<ChevronDownIcon /> } fontSize="25px" variant={post.voteStatus === -1 ? undefined : "outline"} colorScheme={post.voteStatus === -1 ? "red" : "blue"} size="sm"/>
        </Flex>

    );
}