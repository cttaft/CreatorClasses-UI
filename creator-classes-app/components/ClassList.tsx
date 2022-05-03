import { FunctionComponent, useState } from "react";
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import Link from "next/link";
import { CreatorClass } from "../types/CreatorClass";
import useSWR, { Fetcher, useSWRConfig } from "swr";
import SubscriptionService from "../pages/api/SubscriptionService";

type Props = {
    classes: CreatorClass[],
    showUnsubscribe : boolean,
    bearerToken?: string 
}


const ClassList: FunctionComponent<Props> = ({ classes, showUnsubscribe, bearerToken }) => {

     
    var ss = new SubscriptionService();

    const fetcher: Fetcher<CreatorClass[]> = (token: string) => ss.getSubscriptions(token);

    const { data, mutate } = useSWR<CreatorClass[]>(bearerToken!, fetcher, { fallbackData: classes, refreshInterval: 1000  });

    const unSubscribe = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const button: HTMLButtonElement = event.currentTarget;
        await mutate(ss.unsubscribe(button.name, bearerToken!), {
            optimisticData : [...data!]?.filter(a => a.classId.toString() != button.name),
            rollbackOnError: true,
            populateCache: false,
            revalidate: true
            });
    };


    return (

        <div>
            <Container fluid>
                <Row className ="justify-content-md-center">
                    {data ? (
                        <>
                    {data.map(selectedClass => (
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
                    ))}</>
                    ) : null}
                </Row>
            </Container>
        </div>
    );
}
export default ClassList;