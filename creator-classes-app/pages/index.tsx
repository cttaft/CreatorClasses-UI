import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Button, Col, Container, Row } from "react-bootstrap";
import FeaturedCreators from '../components/FeaturedCreators';
import { ContentCreator } from '../types/ContentCreator';
import Link from 'next/link';

interface Props {
  featuredCreators: ContentCreator[]
}

const Home: NextPage<Props> = ({ featuredCreators }) => {

  return (
    <Container fluid>
      <Head>
        <title>Creator Classes</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Row className={`position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light ${styles.bgImageTop}`}>
        <Row className="col-md-5 p-lg-5 mx-auto my-5">
          <h1 className="display-4 fw-normal">Creator Classes</h1>
          <p className="lead fw-normal">Go Viral.</p>
        </Row>
      </Row>
      <FeaturedCreators creators={featuredCreators}></FeaturedCreators>
      <Row className={`position-relative overflow-hidden p-3 p-md-5 m-md-3 ${styles.bgImageMiddle}`}>
        <Col sm={3}>
          <h2>About us</h2>
          <p>A platform to let content creators teach their secrets for success.</p>
        </Col>
      </Row>
      <Row className={`position-relative overflow-hidden p-3 p-md-5 m-md-3 ${styles.bgImageLearn}  text-center`}>
        <h2 className="display-5 fw-normal">Gain A Following</h2>
        <Col lg={12}>
        <Button variant="outline-dark" className ={ `${styles.btn}`} href="/classes"><span>Start Learning</span></Button>
        </Col>
      </Row>

    </Container >

  )
}

export default Home


export const getStaticProps: GetStaticProps = async (context) => {



  const response = await fetch(`https://creator-classes-experience-api.azurewebsites.net/creators`);
  const allCreators : ContentCreator[] =  await response.json();

  return {
    props: {
      featuredCreators: allCreators.slice(0, 3)
    },
    revalidate : 10
  }
}

