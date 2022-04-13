import { FunctionComponent } from "react";
import { Container, Carousel, Image, Row } from 'react-bootstrap';
import { CreatorClass } from "../types/CreatorClass";

type Props = {
    classes: CreatorClass[]
}
const ClassCarousel: FunctionComponent<Props> = ({ classes }) => {
    return (
       
            <Container>
                 <Row xs={7} className="justify-content-md-center">
                <Carousel>
                    {classes.map(selectedClass => 
                        <Carousel.Item key={selectedClass.classId}>
                            <Image fluid src={selectedClass.classImage}  style={{ height: '30rem', width: '100%'}}/>
                                <Carousel.Caption>
                                 <h3>{selectedClass.className}</h3>
                                <p>{selectedClass.classDescription}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                    )}
                </Carousel>
                </Row>
            </Container>
            
    );
}
export default ClassCarousel;