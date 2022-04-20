
export class ContentCreator{
    creatorId: number;
    name: string;
    imageSrc: string;
    description : string;
    youtubeUrl : string;

    constructor(creatorId : number, name : string, image : string, description : string, youtubeUrl :string ) {
        this.creatorId = creatorId;
        this.name = name;
        this.imageSrc = image;
        this.description = description;
        this.youtubeUrl = youtubeUrl
      }


}