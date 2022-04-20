import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Container } from "react-bootstrap";
import { ContentCreator } from "../../types/ContentCreator";
import CreatorDetail from "../../components/CreatorDetail";
import { CreatorClass } from "../../types/CreatorClass";


interface Props {
    creator: ContentCreator
    classes: CreatorClass[]
};

const CreatorDetailPage: NextPage<Props> = ({ creator , classes}) => {

    return (<Container>
        <CreatorDetail creator={creator} classes={classes}></CreatorDetail>
    </Container>);
};
export default CreatorDetailPage;


export const getStaticProps: GetStaticProps = async (context) => {
    const creatorId : string = context.params!.id as string;

    const crResponse = await fetch(`https://creator-classes-experience-api.azurewebsites.net/creators/${creatorId}`);
    const creator = await crResponse.json();
   const  classes = await fetch(`https://creator-classes-experience-api.azurewebsites.net/classes/byCreator/${creatorId}`,
    {
      headers: {
        'Content-type': 'application/json',
      }
    }).then((res) => res.json()).then((data) => { return data; }).catch((error) => { return []; })
    
    return {
        props: {
            creator: creator,
            classes : classes
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