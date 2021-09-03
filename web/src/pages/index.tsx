import { NavBar } from "../components/NavBar";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient} from 'next-urql'
import { usePostsQuery } from "../generated/graphql";
import { Link } from "@chakra-ui/react"
import { Layout } from "../components/Layout";
import NextLink from "next/link";

const Index = () => {
    const [{data}] = usePostsQuery(); 
    return (
        <Layout>
            <NextLink href="/create-post">
                <Link>create post</Link>
            </NextLink>
        <br/>
        <div> hello world !!</div>
       {!data ? <div>Loading Posts ...</div>: data.posts.map(p => 
                <div key={p._id}>
                    {p.title}
                </div>)
                }
        </Layout>



    );
};


export default withUrqlClient(createUrqlClient, {ssr: true})(Index); 


