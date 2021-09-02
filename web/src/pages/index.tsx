import { NavBar } from "../components/NavBar";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient} from 'next-urql'
import { usePostsQuery } from "../generated/graphql";

const Index = () => {
    const [{data}] = usePostsQuery(); 
    return (
        <>
        <NavBar />
        <div> hello world !!</div>
       {!data ? <div>Loading Posts ...</div>: data.posts.map(p => 
                <div key={p._id}>
                    {p.title}
                </div>)
        }
        </>



    );
};


export default withUrqlClient(createUrqlClient, {ssr: true})(Index); 


