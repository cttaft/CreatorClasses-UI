import { NextPage } from "next";
import { GetStaticProps } from 'next'
import { useUserContext } from "../../context/UserContext";
import ClassList from "../components/ClassList";

const StudentDashboard : NextPage = () => {
  const { userId } = useUserContext();
    return (
    <ClassList userId={userId}></ClassList>);
};
export default StudentDashboard; 



export const getStaticProps: GetStaticProps = async () => { 
    //call api to get classes to explore?
    return {
      props: {
     
      },
    };
  };
