import React from "react";
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
} from '@chakra-ui/react'

const NewPost: React.FC<{isOpen: boolean, onOpen: VoidFunction, onClose: VoidFunction}> = ({isOpen, onClose}) => {
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
                            <Input id='title' type='text' />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='content'>Content</FormLabel>
                            <Textarea id='content' />
                        </FormControl>
                    </Flex>
                </ModalBody>

                <ModalFooter>
                    <Button variant='ghost' mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button colorScheme={'green'}>Post</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

    </>
}

export default NewPost;