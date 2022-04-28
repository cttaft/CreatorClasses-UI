
import { Button, Row, Col, Image } from "react-bootstrap";
import { ContentCreator } from "../types/ContentCreator";
import { FunctionComponent } from "react";
import { CreatorClass } from "../types/CreatorClass";
import ClassList from "./ClassList";
import Link from "next/link";

type Props = {
    creator: ContentCreator,
    classes: CreatorClass[]
}

const CreatorDetail: FunctionComponent<Props> = ({ creator, classes }) => {
    return (
        <>
        <Row>
            <h2>{creator.name}</h2>

            <Row xs={2} md={4} lg={6}><Col><Link href={creator.youtubeUrl}><img style={{cursor:'pointer'}} src={creator.imageSrc}></img></Link></Col><Col>{creator.description}</Col></Row>
            
        </Row>
        <ClassList classes={classes}></ClassList>
        </>
    )
}

export default CreatorDetail;