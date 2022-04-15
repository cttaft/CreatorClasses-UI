import { secureHeapUsed } from "crypto";
import { Session } from "next-auth";
import { FunctionComponent, MouseEventHandler, useState } from "react";
import { Container, Carousel, Image, Row, Button } from 'react-bootstrap';
import { CreatorClass } from "../types/CreatorClass";

type Props = {
    classes: CreatorClass[],
    session: Session | null
}
const ClassCarousel: FunctionComponent<Props> = ({ classes, session }) => {



    const subscribe = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const button: HTMLButtonElement = event.currentTarget;
        await fetch(`https://creator-classes-experience-api.azurewebsites.net/subscriptions`,
            {
                method: 'POST',
                body: JSON.stringify({classId : parseInt(button.name)}),
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${session!.accessToken}`,
                }
            });

    };

    return (

        <Container>
            <Row xs={7} className="justify-content-md-center">
                <Carousel>
                    {classes.map(selectedClass =>
                        <Carousel.Item key={selectedClass.classId}>
                            <Image fluid src={selectedClass.classImage} style={{ width: '100%', height: '500px' }} />
                            <Carousel.Caption>
                                <h3>{selectedClass.className}</h3>
                                <p>{selectedClass.classDescription}</p>
                                <Button name={selectedClass.classId.toString()} onClick={subscribe} disabled={!session}>Subscribe</Button>
                            </Carousel.Caption>

                        </Carousel.Item>
                    )}
                </Carousel>
            </Row>
        </Container>

    );
}
export default ClassCarousel;