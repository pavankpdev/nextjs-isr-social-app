import type { NextPage } from 'next'
import Head from 'next/head'
import {Container, Grid} from "@chakra-ui/react";

// COMPONENTS
import Navbar from "../components/Navbar";
import Post from "../components/Post";

const Home: NextPage = () => {
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
              <Post
                  title={'Focus on specific element'}
                  content={'Chakra automatically sets focus on the first tabbable element in the modal. However, there might be scenarios where you need to manually control where focus goes'}
                  timestamp={'2022-02-18T15:57:19.771Z'}
                  user={'pavan'}
              />

          </Grid>
      </Container>

    </div>
  )
}

export default Home
