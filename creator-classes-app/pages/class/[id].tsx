import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { Container, Row, Col, Image, ListGroup } from "react-bootstrap";
import { ClassesService } from "../../lib/ClassesService";
import { CreatorClass } from "../../Types/CreatorClass";

interface Props {
    currentClass: CreatorClass
};

const ClassDetail: NextPage<Props> = ({ currentClass }) => {

    return (<Container>
        <Row>
            <Col><h2>{currentClass.className}</h2>
                <Row><h5><b>Class Description:</b></h5></Row>
                <Row><h5>{currentClass.classDescription}</h5></Row>
                <Row><b>Videos</b><ListGroup as="ol">{currentClass.videos.map(a => <ListGroup.Item as="li"><Col><Link href ={`/class/${currentClass.classId}/video/${a.videoId}`}>{a.title}</Link></Col><Col>{a.timeAsString}</Col></ListGroup.Item>
                )}</ListGroup></Row>
            </Col>
            <Col><Image src={currentClass.classImage} fluid></Image></Col>
        </Row>
    </Container>);
};
export default ClassDetail;


export const getStaticProps: GetStaticProps = async (context) => {
    const cs = new ClassesService();
    const currentClass = JSON.stringify(cs.getClassInfo(parseInt(context.params.id)));
    return {
        props: {
            currentClass: JSON.parse(currentClass)
        }
    }

}

export const getStaticPaths: GetStaticPaths = async () => {
    const cs = new ClassesService();
    const classIds: number[] = cs.getAllClassIds();
    const paths = classIds.map((classId) => {
        const classIdAsString = classId.toString();
        return {
            params: { id: classIdAsString },
        }
    })
    return { paths, fallback: false }
}