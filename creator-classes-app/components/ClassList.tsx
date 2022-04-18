import { FunctionComponent } from "react";
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import styles from './ClassList.module.css';
import Link from "next/link";
import { CreatorClass } from "../types/CreatorClass";

type Props = {
    classes: CreatorClass[],
    name : string
}
const ClassList: FunctionComponent<Props> = ({ classes, name }) => {
  
    return (

        <div>
            <h1 className={`${styles.studentHeader}`}>{name}'s Classes</h1>
            <Container fluid>
                <Row className ="justify-content-md-center">
                    {classes.map(selectedClass => (
                        <Card key={selectedClass.classId} style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={selectedClass.classImage} style={{ height: '12rem'}} />
                            <Card.Body>
                                <Card.Title>{selectedClass.className}</Card.Title>
                                <Card.Text>
                                    {selectedClass.classDescription}
                                </Card.Text>
                                <Link href={`/class/${selectedClass.classId}`}><Button variant="primary">Go to class</Button></Link>
                            </Card.Body>
                        </Card>
                    ))}
                </Row>
            </Container>
        </div>
    )
}
export default ClassList;