import { Error } from '../generated/graphql';

export const toErrorMap = (errors: Error[]) => {
    const errorMap: Record<string, string> = {} // creates a map with key as field and value as message
    errors.forEach(({field, message}) => {
        errorMap[field] = message
    })
    
    return errorMap;
}
