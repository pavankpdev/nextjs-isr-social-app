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
    useColorModeValue, useToast,
} from '@chakra-ui/react';
import {useContext, useState} from "react";
import Link from 'next/link'


// CONTEXT
import {UserContext} from "../../context/users";

// API
import {loginApi} from "../../utils/authApi";
import {useRouter} from "next/router";

export default function Login() {
    const [input, setInput] = useState({
        username: "",
        password: ""
    })

    const {updateUser} = useContext(UserContext)

    const toast = useToast();
    const router = useRouter();

    const handleChange = (event: any) => {
        setInput({...input, [event.target.id] : event.target.value})
    }

    const handleSubmit = async () => {
        try {
            const res = await loginApi(input.username, input.password)
            const { username } = res;
            updateUser({firstName: '', lastName: '', username, id: ''});
            router.push('/')
        } catch (error: any) {
            toast({
                title: error?.response?.data?.message || 'Login failed!',
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
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>

                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="un">
                            <FormLabel>Username</FormLabel>
                            <Input type="text"  id={'username'} onChange={handleChange} value={input.username} />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password"  id={'password'} onChange={handleChange} value={input.password} />
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
                                Sign in
                            </Button>
                        </Stack>
                        <Link href={'/auth/register'}><Text textAlign={'center'} cursor={'pointer'} fontSize={'xs'} fontWeight={600} color={'blue.600'} >New user? Create account</Text></Link>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}