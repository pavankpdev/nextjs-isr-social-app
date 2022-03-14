import React, {useState} from "react";
import {Avatar, Flex, Heading, Text} from "@chakra-ui/react";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

// API
import {getUserById} from "../utils/userApi";

dayjs.extend(relativeTime)

interface PostProps {
    title: string;
    content: string;
    createdAt: string;
    user: { id: string };
}

const Post: React.FC<PostProps> = (props) => {
    const [username, setUsername] = useState('')

    React.useEffect(() => {
        getUserById(props.user?.id)
            .then((data) => setUsername(data?.username || 'unknown user'))
            .catch((error) => console.log(error))
    }, [props])


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
                        src={`https://avatars.dicebear.com/api/micah/${username}.png?mood[]=happy`}
                    />
                    <Text>@{username}</Text>
                </Flex>
                <Text>posted {dayjs(props.createdAt).fromNow() }</Text>
            </Flex>
        </Flex>
    </>
}

export default Post;