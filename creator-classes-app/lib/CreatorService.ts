import { ContentCreator } from "../types/ContentCreator";

export class CreatorService {
     creators :ContentCreator[] = [
        new ContentCreator(1, "Charlie Taft", "https://media-exp1.licdn.com/dms/image/C4D03AQG-zmQbrYun4Q/profile-displayphoto-shrink_200_200/0/1639689578477?e=1654128000&v=beta&t=0o5zMD1NNjhAg4njMrzm3-P1KAJjxy-ungtax4K-O0Y", "Just a cool dude living his best"),
        new ContentCreator(2, "John Ballen", "https://www.famousbirthdays.com/faces/mr--ballen-image.jpg", "Storyteller of the strange dark and mysterious"),
        new ContentCreator(3, "Tom Vasel", "https://www.dicetower.com/sites/default/files/tomr.jpg", "Board game reviewer")
     ]

    getCreatorInfo(creatorId : number)
    {
        console.log(creatorId)
        return this.creators.find(a => a.creatorId == creatorId);
    }

    getAllCreators()
    {
        return this.creators;
    }

    getAllCreatorIds()
    {
        return this.creators.map(a => {return a.creatorId});
    }

}