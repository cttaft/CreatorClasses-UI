import { GetServerSideProps, NextPage } from "next";
import ClassList from "../../components/ClassList";
import { useSession, getSession } from 'next-auth/react'
import { CreatorClass } from "../../types/CreatorClass";



interface Props {
  classes: CreatorClass[]
  username: string
};

const StudentDashboard: NextPage<Props> = ({ classes }) => {

  const { data: session, status } = useSession({ required: true });

  if (session) {
    return (
      <ClassList classes={classes} name={session.name}></ClassList>);
  }
};


export const getServerSideProps: GetServerSideProps = async (context) => {

  const session = await getSession(context);
  const response = await fetch('https://creator-classes-experience-api.azurewebsites.net/user/classes',
    {
      headers: {
        method: 'GET',
        'Content-type': 'application/json',
        'Authorization': `Bearer ${session.accessToken}`, 
      }
    });


  const classes = await response.json()

  return {
    props: {
      classes: classes
    }
  }
}
export default StudentDashboard;




