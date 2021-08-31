import React from 'react';
import { Box } from '@chakra-ui/react';


interface WrapperProps {
    variant?: "small" | "regular"; //adding a question mark makes this optional
}

// we are going to use this wrapper to wrap pages and the default is going to be regular
// children is the form input/label and wrapper is rendering it inside the box. 
export const Wrapper: React.FC<WrapperProps> = ({ children, variant="regular" }) => {
    // if the variant = 'regular', maxW of the form = 800px. If variant = 'small', maxW = 400px.
    return <Box mt={8} mx="auto" maxW={variant === "regular" ? "800px": "400px"} 
    w="100%">{ children }</Box>;
}


export default Wrapper