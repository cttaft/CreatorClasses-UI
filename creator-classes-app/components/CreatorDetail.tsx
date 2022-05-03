
import {  Row, Col } from "react-bootstrap";
import { ContentCreator } from "../types/ContentCreator";
import { FunctionComponent } from "react";
import { CreatorClass } from "../types/CreatorClass";
import ClassList from "./ClassList";

type Props = {
    creator: ContentCreator,
    classes: CreatorClass[]
}

const CreatorDetail: FunctionComponent<Props> = ({ creator, classes }) => {
    return (
        <>
        <Row>
            <h2>{creator.name}</h2>

            <Row xs={2} md={4} lg={6}><Col><a href={creator.youtubeUrl} target="_blank"><img style={{cursor:'pointer'}} src={creator.imageSrc}></img></a></Col><Col>{creator.description}</Col></Row>
            
        </Row>
        <ClassList classes={classes} showUnsubscribe={false}></ClassList>
        </>
    )
}

export default CreatorDetail;