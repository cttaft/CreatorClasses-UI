
export class ContentCreator{
    creatorId: number;
    name: string;
    imageSrc: string;
    description : string;

    constructor(creatorId : number, name : string, image : string, description : string ) {
        this.creatorId = creatorId;
        this.name = name;
        this.imageSrc = image;
        this.description = description;
      }


}