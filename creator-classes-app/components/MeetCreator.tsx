import { ContentCreator } from "../../types/ContentCreator";
import { Container, Row, Col, Image } from "react-bootstrap";
import Link from "next/link";

type Props = {
    creator : ContentCreator
}

const MeetCreator: FunctionComponent<Props> = ({ creator }) => {
    return(
        <Row>
        <h2>Meet your Content Creator : <Link href={`/creator/${creator.creatorId}`}>{creator.name}</Link></h2>
       
        <Row xs={2} md={4} lg={6}><Col><Image src={creator.image} fluid></Image></Col><Col>{creator.description}</Col></Row>
    </Row>
    )
}

export default MeetCreator;