import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import axios from "axios";
import { Flex, Heading, Spinner, Text} from "@chakra-ui/react";
import React from "react";
import {useRouter} from "next/router";

// TYPES
import {POST} from "../../types";

const Post: NextPage<{ post: POST | null }> = ({post}) => {
    const route = useRouter();

    if(route.isFallback) {
        return <Flex flexDir={'column'} h={'100vh'} w={'100vw'} justify={'center'} align={'center'} >
            <Spinner />
        </Flex>
    }

    if(!post) {
        return <Text>No Post found for the id {route.query.id}</Text>
    }

    return <>
        <Heading fontWeight={900} size={'2xl'}>
            {post.title}
        </Heading>

        <Text fontSize={'lg'} fontWeight={700}>
            {post.content}
        </Text>

    </>
}

export const getStaticProps: GetStaticProps = async (ctx) =>  {
    try {

        const id = (ctx.params as {id: string}).id;
        const res = await axios.get(`http://localhost:3000/api/post/${id}`);

        return {
            props: {
                post: res?.data?.post || null,
            },
            revalidate: 20, // 20 Seconds
        }
    } catch (error: any) {
        return  {
            props: {
                post: null
            }
        }
    }
}

export const getStaticPaths: GetStaticPaths<{id: string}> = async () => {
    const res = await axios.get('http://localhost:3000/api/post');

    // adding page limit to pre-render certain number of pages, others can be rendered on demand.
    const pageLimit = 5;

    // Get the paths we want to pre-render based on posts id
    const paths = res?.data?.posts?.slice(0, pageLimit).map((post: any) => ({
        params: { id: post.id },
    }))

    return { paths, fallback: 'blocking' }
}


export default Post;