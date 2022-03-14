import React, {useState, useContext} from "react";
import {
    FormControl,
    FormLabel,
    Input, Textarea,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button, Flex,
    useToast
} from '@chakra-ui/react'

// CONTEXT
import {UserContext} from "../context/users";

// API
import {createPostApi} from "../utils/postApi";

const NewPost: React.FC<{isOpen: boolean, onOpen: VoidFunction, onClose: VoidFunction}> = ({isOpen, onClose}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [post, setPost] = useState({
        title: '',
        content: ''
    })

    const {user} = useContext(UserContext)

    const toast = useToast();

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            await createPostApi({...post, user: {id: user.id}});
            setIsLoading(false);
            setPost({
                title: '',
                content: ''
            })
            onClose()
            toast({
                title: 'Post created!',
                status: 'success',
                duration: 3000,
                isClosable: true
            })
        } catch (error: any) {
            setIsLoading(false);
            console.log(error)
        }
    }

    const handleChange = (event: any) => {
        setPost(post => ({...post, [event.target.id]: event.target.value}))
    }

    return <>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex flexDirection={'column'} gridGap={'1rem'}>
                        <FormControl>
                            <FormLabel htmlFor='title'>Title</FormLabel>
                            <Input id='title' type='text' onChange={handleChange} value={post.title}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='content'>Content</FormLabel>
                            <Textarea id='content' onChange={handleChange} value={post.content}/>
                        </FormControl>
                    </Flex>
                </ModalBody>

                <ModalFooter>
                    <Button variant='ghost' mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button colorScheme={'green'} onClick={handleSubmit} isLoading={isLoading} loadingText={'Creating Post...'}>Post</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

    </>
}

export default NewPost;