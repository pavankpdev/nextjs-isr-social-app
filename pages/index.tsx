import type { NextPage } from 'next'
import Head from 'next/head'
import {Container, Grid} from "@chakra-ui/react";
import {useEffect, useState} from "react";

// COMPONENTS
import Navbar from "../components/Navbar";
import Post from "../components/Post";

// API
import {getAllPost} from "../utils/postApi";

const Home: NextPage = () => {
   const [posts, setPosts] = useState([])

   useEffect(() => {
       getAllPost()
           .then((data) => setPosts(data))
           .catch(err => console.log(err))
   }, [])

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

export default Home
