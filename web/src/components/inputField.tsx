import React from 'react';
import { FormControl, FormLabel, Input, FormErrorMessage,Textarea} from '@chakra-ui/react';
import { useField } from 'formik';
import { type } from 'node:os';
import { InputHTMLAttributes } from 'react';

// so you are basically saying that you want your input field component to take any props
// that a regular input field would take.

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string; // this makes input field of name required
    textarea?: boolean;
};

// isInvalid = '' => going to be false
// isInvalid = 'error msg stuff' => true
export const InputField: React.FC<InputFieldProps> = ({label,textarea, size:_, ...props}) => {
    let InputOrTextarea = Input; 
    if (textarea) {
        InputOrTextarea = Textarea;
    }
    const [field, {error}] = useField(props);
    return (
        <FormControl isInvalid={!!error}>
                <FormLabel htmlFor={field.name}>{label}</FormLabel>
                <InputOrTextarea {...field} {...props} id={field.name} />
                {error ? <FormErrorMessage>{error}</FormErrorMessage> : null} 
        </FormControl>
    );
    // the last line in FormControl if there is an error msg, it will show the err msg, otherwise null.
};

export default InputField;