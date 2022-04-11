import { FunctionComponent } from "react";
import { ClassesService } from "../../lib/ClassesService";
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import './ClassList.module.css';

type Props = {
    userId: number
}
const ClassList: FunctionComponent<Props> = ({ userId }) => {
    const cs = new ClassesService();
    const classes = cs.getClassesForUser(userId);
    return (

        <div>
            <h1>Your Classes</h1>
            <Container>
                <Row>
                    {classes.map(selectedClass => (
                        <Card key={selectedClass.classId} style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={selectedClass.classImage} style={{ height: '12rem'}} />
                            <Card.Body>
                                <Card.Title>{selectedClass.className}</Card.Title>
                                <Card.Text>
                                    {selectedClass.classDescription}
                                </Card.Text>
                                <Button variant="primary" href={`/class/${selectedClass.classId}`}>Go to class</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </Row>
            </Container>
        </div>
    )
}
export default ClassList;