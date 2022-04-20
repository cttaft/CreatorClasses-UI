import { GetServerSideProps, NextPage } from "next";
import ClassList from "../../components/ClassList";
import { useSession, getSession } from 'next-auth/react'
import { CreatorClass } from "../../types/CreatorClass";



interface Props {
  classes: CreatorClass[]
};

const StudentDashboard: NextPage<Props> = ({ classes }) => {

  const { data: session, status } = useSession({ required: true });

  if (session) {
    return (
      <>
         <h1>{session.name as string}&apos;s Classes</h1>
         <ClassList classes={classes}></ClassList>
      </>
    )}
  return null;
};
export default StudentDashboard;


export const getServerSideProps: GetServerSideProps = async (context) => {

  const session = await getSession(context);
  if (!session) {
    return {
      props: {
        classes: []
      }
    }
  }
  const response = await fetch(`https://creator-classes-experience-api.azurewebsites.net/subscriptions`,
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
      classes: classes as CreatorClass[]
    }
  }
}





