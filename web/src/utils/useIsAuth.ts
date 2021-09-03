import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";
import Router from "next/router"



export const useIsAuth = () => {
    const [{data, fetching}] = useMeQuery(); // checks if you are logged in or not and redirects you based on that
    const router = useRouter();
    useEffect(() => {
      if (!fetching && !data?.me) {
          router.replace("/login");
      }
  }, [fetching, data, Router]);
}