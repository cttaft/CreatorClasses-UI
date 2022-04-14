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
      <ClassList classes={classes} name={session.name as string}></ClassList>);
  }
};


export const getServerSideProps: GetServerSideProps = async (context) => {

  const session = await getSession(context);
  if (!session) {
    return {
      props: {
        classes: []
      }
    }
  }
  const response = await fetch(`${process.env.EXPERIENCE_API_BASEURL}/subscriptions`,
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




