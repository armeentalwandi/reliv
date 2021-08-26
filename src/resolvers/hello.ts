import { Resolver, Query } from "type-graphql"

@Resolver()
export class HelloResolver {
    // adds a query
    @Query(() => String) //query returns a string  
    hello() {
        return "bye"
    }
}