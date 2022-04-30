import { FunctionComponent, useState } from "react";
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import Link from "next/link";
import { CreatorClass } from "../types/CreatorClass";

type Props = {
    classes: CreatorClass[],
    showUnsubscribe : boolean,
    bearerToken?: string 
}


const ClassList: FunctionComponent<Props> = ({ classes, showUnsubscribe, bearerToken }) => {

    const [subscriptions, setSubscriptions] = useState(classes);

    const getSubscriptions = async() =>{
        const response = await fetch(`https://creator-classes-experience-api.azurewebsites.net/subscriptions`,
    {
      headers: {
        method: 'GET',
        'Content-type': 'application/json',
        'Authorization': `Bearer ${bearerToken}`,
      }
    });
        return await response.json();
    }


    const unSubscribe = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const button: HTMLButtonElement = event.currentTarget;
        await fetch(`https://creator-classes-experience-api.azurewebsites.net/subscriptions/${button.name}`,
            {
                method: 'DELETE',
                body: JSON.stringify({classId : parseInt(button.name)}),
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${bearerToken}`,
                }
            })

            setSubscriptions(await getSubscriptions());
    };


    return (

        <div>
            <Container fluid>
                <Row className ="justify-content-md-center">
                    {subscriptions.map(selectedClass => (
                        <Card key={selectedClass.classId} style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={selectedClass.classImage} style={{ height: '12rem'}} />
                            <Card.Body>
                                <Card.Title>{selectedClass.className}</Card.Title>
                                <Card.Text>
                                    {selectedClass.classDescription}
                                </Card.Text>
                                <Row>
                                    <Col>
                                    <Link href={`/class/${selectedClass.classId}`}><Button variant="primary">Go to class</Button></Link>
                                    </Col>
                                    {showUnsubscribe ? (<Col><Button name={selectedClass.classId.toString()} onClick={unSubscribe}>Unsubscribe</Button></Col>) : (<></>)}
                                </Row>
                            </Card.Body>
                        </Card>
                    ))}
                </Row>
            </Container>
        </div>
    );
}
export default ClassList;