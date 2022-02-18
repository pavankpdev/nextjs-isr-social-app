import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import {useState} from "react";

export default function Register() {
    const [input, setInput] = useState({
        firstName: "",
        lastName: "",
        password: ""
    })

    const handleChange = (event: any) => {
        setInput({...input, [event.target.id] : event.target.value})
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Create new account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="fn">
                            <FormLabel>First name</FormLabel>
                            <Input type="text" id={'firstName'} onChange={handleChange} value={input.firstName} />
                        </FormControl>
                        <FormControl id="ln">
                            <FormLabel>Last name</FormLabel>
                            <Input type="text" id={'lastName'} onChange={handleChange} value={input.lastName} />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password" id={'password'} onChange={handleChange} value={input.password} />
                        </FormControl>
                        <Stack spacing={10}>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Create account
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}