import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Button, Col, Container, Row  } from "react-bootstrap";
import FeaturedCreators from '../components/FeaturedCreators';
import { ContentCreator } from '../types/ContentCreator';
import { CreatorService } from '../lib/CreatorService';

interface Props {
  featuredCreators : ContentCreator[]
}

const Home: NextPage<Props> = ({featuredCreators}) => {

  return (
    <Container fluid>
      <Head>
        <title>Creator Classes</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
=
        <Row className={`position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light ${styles.bgImage}`}>
          <Row className="col-md-5 p-lg-5 mx-auto my-5">
            <h1 className="display-4 fw-normal">Creator Classes</h1>
            <p className="lead fw-normal">Go Viral.</p>
          </Row>
        </Row>
        <FeaturedCreators creators={featuredCreators}></FeaturedCreators>
       
    </Container>

  )
}

export default Home


export const getStaticProps: GetStaticProps = async (context) => {



  const creators = JSON.stringify(new CreatorService().getAllCreators());

  return {
    props: {
      featuredCreators: JSON.parse(creators)
    }
  }
}

