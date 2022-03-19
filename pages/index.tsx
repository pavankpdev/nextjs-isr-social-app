import type {GetStaticProps, NextPage} from 'next'
import Head from 'next/head'
import {Container, Grid} from "@chakra-ui/react";

// COMPONENTS
import Navbar from "../components/Navbar";
import Post from "../components/Post";

// API
import axios from "axios";

// TYPES
import {POST} from "../types";

const Home: NextPage<{posts: POST[]}> = ({posts}) => {

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="A simple social media app to implement Incremental Static Regeneration (ISR) from nextjs" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />

            <Container my={'2rem'} maxW={"container.xl"}>
                <Grid gridTemplateColumns={"repeat(3, 1fr)"} cursor={'pointer'} gridGap={'1rem'}>
                    {
                        posts.map((post: any) => <Post {...post} key={post.id} />)
                    }


                </Grid>
            </Container>

        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {

    const res = await axios.get('http://localhost:3000/api/post');

    return {
        props: {
            posts: res?.data?.posts || [],
        },
        revalidate: 10, // 10 Seconds
    }
}

export default Home
