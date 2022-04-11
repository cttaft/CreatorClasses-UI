import { Video } from "./Video";

export class CreatorClass{
    classId: number;
    className: string;
    classImage: string;
    classDescription : string;
    videos: Video[]

    constructor(classId : number, className : string, classImage : string, classDescription : string, videos: Video[] ) {
        this.classId = classId;
        this.className = className;
        this.classImage = classImage;
        this.classDescription = classDescription
        this.videos = videos
      }


}