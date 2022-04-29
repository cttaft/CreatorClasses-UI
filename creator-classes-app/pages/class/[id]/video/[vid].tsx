import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ReactPlayer from "react-player";
import { CreatorClass } from "../../../../types/CreatorClass";
import { Video } from "../../../../types/Video";

interface Props {
    currentClass: CreatorClass
    currentVideo: Video
};

const ClassDetail: NextPage<Props> = ({ currentClass, currentVideo }) => {

    const { data: session } = useSession({ required: true });

    const [hasAccess, setAccess] = useState<boolean>(false);

    useEffect(() => {
        async function getAccess() {
            let subs: CreatorClass[] = [];
            if (session) {
                subs = await fetchSubs(session);
            }
            if (subs.find(a => a.classId == currentClass.classId)) {
                setAccess(true)
            }
        }
        getAccess();
    }, []);

    const fetchSubs = async (session: Session) => {
        const response = await fetch(`https://creator-classes-experience-api.azurewebsites.net/subscriptions`,
            {
                headers: {
                    method: 'GET',
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${session.accessToken}`,
                }
            });
        return await response.json()
    }
    if(hasAccess)
    {
    return (
        <>
        <h1>{currentClass.className}</h1>
        <h2>{currentVideo.title}</h2>
        <ReactPlayer url={`${currentVideo.videoSrc}`}></ReactPlayer>
    </>);
    }
    return (<h1>You are not subscribed to {currentClass.className}</h1>)
};
export default ClassDetail;


export const getStaticProps: GetStaticProps = async (context) => {
    const classId: string = context.params!.id as string;
    const vidId: string = context.params!.vid as string;
    const response = await fetch(`https://creator-classes-experience-api.azurewebsites.net/classes/${classId}`);
    const currentClass: CreatorClass = await response.json()
    const video = currentClass?.videos.find(a => a.videoId === parseInt(vidId));
    const currentVideo = JSON.stringify(video);
    return {
        props: {
            currentClass: currentClass,
            currentVideo: JSON.parse(currentVideo),
            revalidate: 10
        }
    }

}

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch(`https://creator-classes-experience-api.azurewebsites.net/classes`);
    const allClasses: CreatorClass[] = await response.json();
    const paths: Array<string | { params: ParsedUrlQuery; locale?: string }> = [];
    allClasses.map((parentClassId) => {
        const classIdAsString = parentClassId.classId.toString();
        parentClassId.videos?.map((v) => {

            paths.push({
                params: { id: classIdAsString, vid: v.videoId.toString() },
            });
        });
    });

    return { paths, fallback: 'blocking' }
}