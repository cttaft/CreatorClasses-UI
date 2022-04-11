import { ContentCreator } from "../types/ContentCreator";

export class CreatorService {
    getCreatorInfo(creatorId : number)
    {
        return new ContentCreator(1, "Charlie Taft", "https://media-exp1.licdn.com/dms/image/C4D03AQG-zmQbrYun4Q/profile-displayphoto-shrink_200_200/0/1639689578477?e=1654128000&v=beta&t=0o5zMD1NNjhAg4njMrzm3-P1KAJjxy-ungtax4K-O0Y", "Just a cool dude living his best");
    }

}