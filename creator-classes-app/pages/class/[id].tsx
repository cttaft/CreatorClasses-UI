import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { Container, Row, Col, Image, ListGroup } from "react-bootstrap";
import { CreatorClass } from "../../types/CreatorClass";
import { ContentCreator } from "../../types/ContentCreator";
import MeetCreator from "../../components/MeetCreator";

interface Props {
    currentClass: CreatorClass,
    creator: ContentCreator
};

const ClassDetail: NextPage<Props> = ({ currentClass, creator }) => {

    return (<Container>
        <Row>
            <Col><h2>{currentClass.className}</h2>
                <Row><h5><b>Class Description:</b></h5></Row>
                <Row><h5>{currentClass.classDescription}</h5></Row>
                <Row><b>Videos</b><ListGroup as="ol">{currentClass.videos?.map(a => <ListGroup.Item as="li" key={a.videoId}><Col><Link href={`/class/${currentClass.classId}/video/${a.videoId}`}>{a.title}</Link></Col><Col>{a.timeAsString}</Col></ListGroup.Item>
                )}</ListGroup></Row>
            </Col>
            <Col><Image src={currentClass.classImage} fluid></Image></Col>
        </Row>
        <MeetCreator creator={creator}></MeetCreator>
    </Container>);
};
export default ClassDetail;


export const getStaticProps: GetStaticProps = async (context) => {
   
    const response = await fetch(`https://creator-classes-experience-api.azurewebsites.net/classes/${context.params!.id}`);

    const currentClass : CreatorClass = await response.json()
    console.log(currentClass);

    const crResponse = await fetch(`https://creator-classes-experience-api.azurewebsites.net/creators/${currentClass.creatorId}`);
    const creator = await crResponse.json();
    return {
        props: {
            currentClass: currentClass,
            creator: creator
        },
        revalidate:10
    }

}

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch(`https://creator-classes-experience-api.azurewebsites.net/classes`);
    const allClasses : CreatorClass[] =  await response.json();
    const paths = allClasses.map((classRes) => {
        return {
            params: { id: classRes.classId.toString() },
        }
    })
    return { paths, fallback: 'blocking' }
}