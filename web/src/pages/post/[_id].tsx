import { Box, Heading } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { EditButton } from '../../components/EditButton';
import { Layout } from '../../components/Layout';
import { usePostQuery } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { useGetPostFromUrl } from '../../utils/useGetPostFromUrl';

const Post = ({}) => {
    const router = useRouter()
     const IntId = typeof router.query._id === 'string' ? parseInt(router.query._id) : -1
    const [{data , error, fetching}] = usePostQuery({
        pause: IntId === -1,
        variables: {
            _id: IntId,
        }
    });
   //const [{ data, error, fetching }] = useGetPostFromUrl();

    if (fetching) {
        return (
            <Layout>
                <div>loading...</div>
            </Layout>
        );

    }

    if (error) {
        return <div>{error.message}</div>
    }

    if (!data?.post) {
        return (<Layout>
            <Box>could not find post</Box>
        </Layout>);
    }
    console.log(data?.post?.text);
    return <Layout>
        <Heading>
            {data.post.title}
        </Heading> 
        <Box mb={4}>
        {data.post.text}
        </Box>
        <EditButton _id={data.post._id} creatorId={data.post.creator._id}/>
        </Layout>
    
}

export default withUrqlClient(createUrqlClient, {ssr: true})(Post);