import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast
} from '@chakra-ui/react';
import {useState, useContext} from "react";
import Link from 'next/link'
import {useRouter} from "next/router";

// CONTEXT
import {UserContext} from "../../context/users";

// API
import {registerApi} from "../../utils/authApi";

export default function Register() {
    const [input, setInput] = useState({
        firstName: "",
        lastName: "",
        password: "",
        username: ''
    })

    const {updateUser} = useContext(UserContext)

    const toast = useToast();
    const router = useRouter();

    const handleChange = (event: any) => {
        setInput({...input, [event.target.id] : event.target.value})
    }

    const handleSubmit = async () => {
        try {
            const res = await registerApi(input)
            const {firstName, lastName, username, id} = res;
            updateUser({firstName, lastName, username, id});
            router.push('/')
        } catch (error: any) {
            toast({
                title: error?.response?.data?.message || 'Registration failed!',
                status: 'error'
            })
        }
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
                        to enjoy all of our cool features ✌️
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
                        <FormControl id="username">
                            <FormLabel>Username</FormLabel>
                            <Input type="text" id={'username'} onChange={handleChange} value={input.username} />
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
                                }}
                                onClick={handleSubmit}
                            >
                                Create account
                            </Button>
                        </Stack>
                        <Link href={'/auth'}><Text textAlign={'center'} cursor={'pointer'} fontSize={'xs'} fontWeight={600} color={'blue.600'} >Already have an account? Login</Text></Link>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}