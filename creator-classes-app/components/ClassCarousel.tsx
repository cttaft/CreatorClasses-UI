import { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent, MouseEventHandler, useEffect, useState } from "react";
import { Container, Carousel, Image, Row, Button } from 'react-bootstrap';
import { CreatorClass } from "../types/CreatorClass";

type Props = {
    classes: CreatorClass[],
    session: Session | null
}
const ClassCarousel: FunctionComponent<Props> = ({ classes, session }) => {

    var router = useRouter();

    const [currentSubs, setSubs] = useState<CreatorClass[]>([]);
    useEffect(() => {
        async function getSubs() {
            let subs : CreatorClass[] = [];
            if(session){
                 subs = await fetchSubs(session);
            }
            setSubs(subs);
        }
        getSubs();
  }, []);

    const fetchSubs  = async (session: Session) => {
        const response = await fetch(`https://creator-classes-experience-api.azurewebsites.net/subscriptions`,
    {
      headers: {
        method: 'GET',
        'Content-type': 'application/json',
        'Authorization': `Bearer ${session.accessToken}`,
      }
    });
        return await response.json()
    }

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

            router.push(`/class/${button.name}`);

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
                                {currentSubs.find(a => a.classId == selectedClass.classId) ? (<Link href={`/class/${selectedClass.classId}`}><Button variant="primary">Go to class</Button></Link>) : 
                                (<Button name={selectedClass.classId.toString()} onClick={subscribe} disabled={!session}>Subscribe</Button>
                                ) }
                            </Carousel.Caption>

                        </Carousel.Item>
                    )}
                </Carousel>
            </Row>
        </Container>

    );
}
export default ClassCarousel;