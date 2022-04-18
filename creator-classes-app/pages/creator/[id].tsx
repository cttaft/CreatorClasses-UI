import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Container, Row, Col, Image, ListGroup } from "react-bootstrap";
import { CreatorService } from "../../lib/CreatorService";
import { ContentCreator } from "../../types/ContentCreator";
import MeetCreator from "../../components/MeetCreator";

interface Props {
    creator: ContentCreator
};

const CreatorDetail: NextPage<Props> = ({ creator }) => {

    return (<Container>
        <MeetCreator creator={creator}></MeetCreator>
    </Container>);
};
export default CreatorDetail;


export const getStaticProps: GetStaticProps = async (context) => {
    const crs = new CreatorService();
    const creatorId : string = context.params!.id as string;
    const cr = crs.getCreatorInfo(parseInt(creatorId));
    const creator = JSON.stringify(cr);
    console.log(creator)
    return {
        props: {
            creator: JSON.parse(creator),
            revalidate: 10
        }
    }

}

export const getStaticPaths: GetStaticPaths = async () => {
    const cs = new CreatorService();
    const creatorIds: number[] = cs.getAllCreatorIds();
    const paths = creatorIds.map((creatorId) => {
        const creatorIdAsString = creatorId.toString();
        return {
            params: { id: creatorIdAsString },
        }
    })
    return { paths, fallback: 'blocking'  }
}