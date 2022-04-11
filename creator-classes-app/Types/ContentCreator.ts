
export class ContentCreator{
    creatorId: number;
    name: string;
    image: string;
    description : string;

    constructor(creatorId : number, name : string, image : string, description : string ) {
        this.creatorId = creatorId;
        this.name = name;
        this.image = image;
        this.description = description;
      }


}