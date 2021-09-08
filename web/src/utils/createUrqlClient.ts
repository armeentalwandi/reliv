import {  dedupExchange, fetchExchange, ssrExchange, gql } from "@urql/core";
import { cacheExchange, Resolver } from "@urql/exchange-graphcache";
import { LogoutMutation, MeQuery, MeDocument, LoginMutation, RegisterMutation, VoteMutationVariables } from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import Router from 'next/router';
import { filter, pipe, tap } from 'wonka';
import { Exchange, stringifyVariables } from 'urql';
import { AnySoaRecord } from "dns";
import isServer from "./isServer";


const errorExchange: Exchange = ({ forward }) => (ops$) => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error?.message.includes("not authenticated")) {
        Router.replace("/login"); // if there is an error, user is redirected to login
      }
    })
  );
};

export const cursorPagination = (
  mergeMode = 'after',
): Resolver => {
 
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    console.log(entityKey, fieldName); // entityKey = Query and fieldName = posts
    const allFields = cache.inspectFields(entityKey);
    console.log("allFields:", allFields);
    const fieldInfos = allFields.filter(info => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    console.log("fieldArgs: ", fieldArgs);
    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolve(
      cache.resolveFieldByKey(entityKey, fieldKey) as string, "posts");
   //console.log(isItInTheCache);
    info.partial = !isItInTheCache; 
    let hasMore = true;
    // check if the data is in the cache and return the cache
    // basically reading the data from the cache and returning it
    const results: string[] = [];
    fieldInfos.forEach((fi) => {
      const key = cache.resolveFieldByKey(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, 'posts') as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      console.log("data: ", hasMore, data);
      results.push(...data);
    })

    return {
      __typename: "PaginatedPosts",
      hasMore,
      posts: results,
    };
//     // const visited = new Set();
//     // let result: NullArray<string> = [];
//     // let prevOffset: number | null = null;

//     // for (let i = 0; i < size; i++) {
//     //   const { fieldKey, arguments: args } = fieldInfos[i];
//     //   if (args === null || !compareArgs(fieldArgs, args)) {
//     //     continue;
//     //   }

//     //   const links = cache.resolve(entityKey, fieldKey) as string[];
//     //   const currentOffset = args[offsetArgument];

//     //   if (
//     //     links === null ||
//     //     links.length === 0 ||
//     //     typeof currentOffset !== 'number'
//     //   ) {
//     //     continue;
//     //   }

//     //   const tempResult: NullArray<string> = [];

//     //   for (let j = 0; j < links.length; j++) {
//     //     const link = links[j];
//     //     if (visited.has(link)) continue;
//     //     tempResult.push(link);
//     //     visited.add(link);
//     //   }

//     //   if (
//     //     (!prevOffset || currentOffset > prevOffset) ===
//     //     (mergeMode === 'after')
//     //   ) {
//     //     result = [...result, ...tempResult];
//     //   } else {
//     //     result = [...tempResult, ...result];
//     //   }

//     //   prevOffset = currentOffset;
//     // }

//     // const hasCurrentPage = cache.resolve(entityKey, fieldName, fieldArgs);
//     // if (hasCurrentPage) {
//     //   return result;
//     // } else if (!(info as any).store.schema) {
//     //   return undefined;
//     // } else {
//     //   info.partial = true;
//     //   return result;
//     // }
  };
};

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = "";
  if (isServer()) {
    cookie = ctx?.req?.headers?.cookie; 
  }
  
  return {
    url: "http://localhost:4000/graphql",
    fetchOptions: {
      credentials:"include" as const, 
      headers: cookie ? { cookie,} : undefined,
    },
    exchanges: [dedupExchange, cacheExchange({
      keys: {
        PaginatedPosts: () => null,
      },
      resolvers: {
        Query: {
          posts: cursorPagination(),
        },
      },
      updates: {
        Mutation: { // invlaidate the query so it forces it to re fetch the data w the new post
          vote: (_result, args, cache, info) => {
            const {postId, value} = args as VoteMutationVariables;
            const data = cache.readFragment(
              gql`
                fragment _ on Post {
                  _id
                  points
                  voteStatus
                }
              `,
              { _id: postId }
            );
            console.log('data: ', data);
            if (data) {
              // so if voteStatus is already 1 or -1, we don't do anything
              if (data.voteStatus === value) {
                return;
              }
              const newPoints = (data.points as number) + (!data.voteStatus ? 1 : 2) * value;
              cache.writeFragment(
                gql`
                  fragment __ on Post {
                    points
                    voteStatus
                  }
                `,
                { _id: postId, points: newPoints, voteStatus: value} as any
              );
            }
          },
          createPost:(_result, args, cache, info) => {
            const allFields = cache.inspectFields('Query');
            const fieldInfos = allFields.filter((info) => info.fieldName === 'posts');
            fieldInfos.forEach((fi) => {
              cache.invalidate("Query", "posts", fi.arguments);
            }
            );
          
          }, 
          logout: (_result, args, cache, info) => {
            // not invalidating the cache but rather set the me query to null
           // so we can just update the query
           betterUpdateQuery<LogoutMutation, MeQuery>(
             cache, 
             {query: MeDocument},
             _result, 
             () => ({me: null})
           );
   
          },
         login: (_result, args, cache, info) => {
           betterUpdateQuery<LoginMutation, MeQuery>(
             cache, 
             {query: MeDocument },
             _result,
             (result, query) => {
               if (result.login.errors) {
                 return query; 
               } else {
                 return {
                   me: result.login.user,
                 }; 
               }
             }
             );// updates the MeQuery
         },
         register: (_result, args, cache, info) => {
           betterUpdateQuery<RegisterMutation, MeQuery>(
             cache,
             { query: MeDocument },
             _result,
             (result, query) => {
               if (result.register.errors) {
                 return query;
               } else {
                 return {
                   me: result.register.user,
                 };
               }
             }
           );
         },
       },
     },
   }),
   errorExchange,
   ssrExchange, 
   fetchExchange,
 ],
};
};

