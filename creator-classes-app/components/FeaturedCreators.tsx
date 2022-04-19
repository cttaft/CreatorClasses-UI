import Link from "next/link";
import { FunctionComponent } from "react";
import { Row, Figure, Col, Container } from 'react-bootstrap';
import { ContentCreator } from "../types/ContentCreator";
import styles from "./FeaturedCreators.module.css";

type Props = {
    creators: ContentCreator[]
}
const ClassList: FunctionComponent<Props> = ({ creators }) => {

    return (
        <Container fluid>
            <Row>
                <Row >
                    <h2 className="text-center">Our Featured Creators</h2>
                </Row>
                {creators.map(featuredCreator => (
                    <Link href={`/creator/${featuredCreator.creatorId}`}  key = {featuredCreator.creatorId}>
                        <Col lg={4} className={`d-flex justify-content-center text-center ${styles.clickable}`}>
                            <Figure>
                                <Figure.Image width={171} height={180} src={`${featuredCreator.imageSrc}`} roundedCircle></Figure.Image>
                                <Figure.Caption className = {styles.creatorCaption}>{featuredCreator.name}</Figure.Caption>
                                <Figure.Caption className = {styles.creatorCaption}>{featuredCreator.description}</Figure.Caption>
                            </Figure>
                        </Col>
                    </Link>
                ))}
            </Row>
        </Container>
    )
}
export default ClassList;