import { CreatorClass } from "../types/CreatorClass";
import { Video } from "../types/Video";
import ClassCarousel from "../components/ClassCarousel";

interface Props {
    classes: CreatorClass[]
  };
  
  const ExploreClasses : NextPage<Props> = ({classes}) => {
      
      return (
      <ClassCarousel classes = {classes}></ClassCarousel>);
      
  }; 

  
export const getServerSideProps : GetServerSideProps = async (context) => {

    
    //get from API...
    const classes = JSON.stringify([new CreatorClass(1234, "How to train your yorkie", 
    "https://www.petplate.com/wp-content/uploads/2021/03/AdobeStock_236757188.jpeg",
     "A great class about great dogs!", [new Video(555, "Intro", "Getting Started with your furry pal", "https://www.youtube.com/watch?v=_9CUjcf0NSI", 605),
     new Video(654, "Potty Traing, PU", "Get your dog going where he needs to!", "https://www.youtube.com/watch?v=V4iOkvBWTys", 12001)], 1),
  new CreatorClass(2345, "Nailing Jello to a Wall", "https://linkedstrategies.com/wp-content/uploads/2020/05/Why-cant-I-make-this-work-scaled.jpg", "How to do the impossible!", 
  [new Video(620,"Intro", "Can it be done?", "https://www.youtube.com/watch?v=8ePy_mnH774", 605)], 1)]);
  
    return {
      props: {
        classes: JSON.parse(classes)
      }
    }
  }
  export default ExploreClasses;
  