import { Video } from "./Video";

export class CreatorClass{
    classId: number;
    className: string;
    classImage: string;
    classDescription : string;
    videos: Video[]
    creatorId: number;

    constructor(classId : number, className : string, classImage : string, classDescription : string, videos: Video[], creatorId: number ) {
        this.classId = classId;
        this.className = className;
        this.classImage = classImage;
        this.classDescription = classDescription;
        this.videos = videos;
        this.creatorId = creatorId;
      }


}