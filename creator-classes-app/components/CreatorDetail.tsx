
import { Button, Row, Col, Image } from "react-bootstrap";
import { ContentCreator } from "../types/ContentCreator";
import { FunctionComponent } from "react";
import { CreatorClass } from "../types/CreatorClass";
import ClassList from "./ClassList";
import yt from '../public/yt.webp'

type Props = {
    creator: ContentCreator,
    classes: CreatorClass[]
}

const CreatorDetail: FunctionComponent<Props> = ({ creator, classes }) => {
    return (
        <>
        <Row>
            <h2>{creator.name}</h2>

            <Row xs={2} md={4} lg={6}><Col><Image  src={creator.imageSrc} fluid></Image></Col><Col>{creator.description}</Col></Row>
            <a href={creator.youtubeUrl}><Image src={yt.src}></Image></a>
        </Row>
        <ClassList classes={classes}></ClassList>
        </>
    )
}

export default CreatorDetail;