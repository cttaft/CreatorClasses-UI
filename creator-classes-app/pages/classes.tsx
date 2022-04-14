
import ClassCarousel from "../components/ClassCarousel";
import { GetStaticProps, NextPage } from "next";
import { Video } from "../types/Video";
import { CreatorClass } from "../types/CreatorClass";

interface Props {
  classes: CreatorClass[]
};

const ExploreClasses: NextPage<Props> = ({ classes }) => {

  return (
    <ClassCarousel classes={classes}></ClassCarousel>);

};


export const getStaticProps: GetStaticProps = async (context) => {


  //get from API...
  const response = await fetch(`${process.env.EXPERIENCE_API_BASEURL}/classes`);

  const classes = await response.json()

  return {
    props: {
      classes: classes
    }
  }
}
export default ExploreClasses;
