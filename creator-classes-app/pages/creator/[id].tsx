import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Container } from "react-bootstrap";
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
    const creatorId : string = context.params!.id as string;

    const crResponse = await fetch(`https://creator-classes-experience-api.azurewebsites.net/creators/${creatorId}`);
    const creator = await crResponse.json();
    
    return {
        props: {
            creator: creator
        },
        revalidate:10
    }

}

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch(`https://creator-classes-experience-api.azurewebsites.net/creators`);
    const allCreators : ContentCreator[] =  await response.json();
    const paths = allCreators.map((creatorRes) => {
        return {
            params: { id: creatorRes.creatorId.toString() },
        }
    })
    return { paths, fallback: 'blocking' }
}