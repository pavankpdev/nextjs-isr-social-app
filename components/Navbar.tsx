import {
    Box,
    Flex,
    Avatar,
    HStack,
    IconButton,
    Button,
    useDisclosure,
    useColorModeValue,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';

// COMPONENTS
import NewPost from "./NewPost";


export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isPostModalOpen, onOpen: openPostModal, onClose: closePostModal } = useDisclosure();

    return (
        <>
            <NewPost isOpen={isPostModalOpen} onOpen={openPostModal} onClose={closePostModal} />
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box>Simple ISR App</Box>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <Button
                            variant={'solid'}
                            colorScheme={'teal'}
                            size={'sm'}
                            mr={4}
                            leftIcon={<AddIcon />}
                            onClick={openPostModal}
                        >
                            Add Post
                        </Button>
                        <Avatar
                            size={'sm'}
                            src={
                                'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                            }
                        />
                        <Button>Logout</Button>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}