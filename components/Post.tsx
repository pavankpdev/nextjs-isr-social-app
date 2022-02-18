import React from "react";
import {Avatar, Flex, Heading, Text} from "@chakra-ui/react";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime)

interface PostProps {
    title: string;
    content: string;
    timestamp: string;
    user: string;
}

const Post: React.FC<PostProps> = (props) => {
    return <>
        <Flex transition={'all .4s linear'} flexDirection={'column'} bg={'white'} gridGap={'10px'} border={'2px solid black'} rounded={'lg'} p={'1rem'} _hover={{
            transition: 'all .4s linear',
            borderColor: 'green.600',
            boxShadow: 'lg',
            '& > h4': {
                transition: 'all .4s linear',
                color: 'green.600'
            }
        }}>
            <Heading as={'h4'} size={'md'}>{props.title}</Heading>
            <Text>{props.content} </Text>

            <Flex alignItems={'center'} justify={'space-between'}>
                <Flex alignItems={'center'} gridGap={'10px'}>
                    <Avatar
                        size={'sm'}
                        src={
                            'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                        }
                    />
                    <Text>@{props.user}</Text>
                </Flex>
                <Text>posted {dayjs(props.timestamp).fromNow() }</Text>
            </Flex>
        </Flex>
    </>
}

export default Post;