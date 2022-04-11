import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { Container } from "react-bootstrap";
import ReactPlayer from "react-player";
import { ClassesService } from "../../../../lib/ClassesService";
import { CreatorClass } from "../../../../types/CreatorClass";
import { Video } from "../../../../types/Video";

interface Props {
    currentClass: CreatorClass
    currentVideo: Video
};

const ClassDetail: NextPage<Props> = ({ currentClass, currentVideo }) => {

    return (<Container>
        <h1>{currentVideo.title}</h1>
        <ReactPlayer url = {`${currentVideo.videoSrc}`}></ReactPlayer>

    </Container>);
};
export default ClassDetail;


export const getStaticProps: GetStaticProps = async (context) => {
    const cs = new ClassesService();
    const classMatch = cs.getClassInfo(parseInt(context.params.id));
    const video = classMatch?.videos.find(a => a.videoId === parseInt(context.params.vid));
    const currentClass = JSON.stringify(classMatch);
    const currentVideo = JSON.stringify(video);
    return {
        props: {
            currentClass: JSON.parse(currentClass),
            currentVideo: JSON.parse(currentVideo)
        }
    }

}

export const getStaticPaths: GetStaticPaths = async () => {
    const cs = new ClassesService();
    const classIds = cs.getAllClassAndVideoIds();
    const paths : Array<string | { params: ParsedUrlQuery; locale?: string }> = [];
    classIds.map((parentClassId) => {
        const classIdAsString = parentClassId.classId.toString();
        parentClassId.videoIds.map((v) => {
            const videoId = v ?? 0;
            paths.push({
                params: { id: classIdAsString, vid: v.toString() },
            });
        });
    });

    return { paths, fallback: false }
}