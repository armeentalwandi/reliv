import { useRouter } from "next/router";

export const useGetIntId = () => {
    const router = useRouter();
    const intId = typeof router.query._id === "string" ? parseInt(router.query._id) : -1; 
    return  intId; 
}

