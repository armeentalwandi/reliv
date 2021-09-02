import { MiddlewareFn } from "type-graphql";
import { MyContext } from "src/types";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
    if (!context.req.session.userId) {
        throw new Error("Please log in before making a new post.");
    }
    return next(); 
}