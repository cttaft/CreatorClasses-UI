import { GetServerSideProps, NextPage } from "next";
import { useSession, getSession } from 'next-auth/react'
import { CreatorClass } from "../../types/CreatorClass";
import { CreatorProfile } from "../../types/CreatorProfile";
import { FormEvent, useState } from "react";
import { Container, FormGroup, Form, Button, Spinner, Row, Card } from 'react-bootstrap';
import UploadProfileImage from "../../components/UploadProfileImage";
import AddClass from "../../components/AddClass";
import { useRouter } from "next/router";
import { Session } from "next-auth";



interface Props {
  profile: CreatorProfile,
  classes : CreatorClass[],
  session: Session
};

const CreatorDashboard: NextPage<Props> = ({ profile, classes }) => {

  const { data: session } = useSession({ required: true });


  const [description, setDescription] = useState<string>(profile?.description);
  const [name, setName] = useState<string>(profile?.name);
  const [youtube, setYoutube] = useState<string>(profile?.youtubeUrl);
  const router= useRouter();



  const updateProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cc = new CreatorProfile(0, name, "", description, youtube);
    const body = JSON.stringify(cc);
    await fetch("https://creator-classes-experience-api.azurewebsites.net/creatorProfile", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${session!.accessToken}`,
        'Content-Type' : 'application/json'
      },
      body
    });
    router.reload();
  }


  if (session) {

      return (
        <Container fluid>
          <h1>Creator Dashboard</h1>
          <Form onSubmit={updateProfile}>
            <FormGroup>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
              <Form.Label>Youtube</Form.Label>
              <Form.Control type="text" value={youtube} onChange={(e) => setYoutube(e.target.value)} />
            </FormGroup>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
          {(profile ?
          <>
          <UploadProfileImage session={session} initialImageSrc={profile?.imageSrc}></UploadProfileImage>
         
          <AddClass creatorId = {profile!.creatorId} session={session} classes={classes}></AddClass>
           </> : (<></>))}
        </Container>);


  }
  return null;
};
export default CreatorDashboard;


export const getServerSideProps: GetServerSideProps = async (context) => {

  const session = await getSession(context);
  if (!session) {
    return {
      props: {
        classes: [],
        profile : null
      }
    }
  }
  const profile: CreatorProfile | null | undefined = await fetch(`https://creator-classes-experience-api.azurewebsites.net/creatorProfile`,
    {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${session.accessToken}`,
      }
    }).then((res) => res.json()).then((data) => { return data; }).catch((error) => { return null; })

    let classes: CreatorClass[] = [];
    if(profile)
    {
       classes = await fetch(`https://creator-classes-experience-api.azurewebsites.net/classes/byCreator/${profile.creatorId}`,
      {
        headers: {
          'Content-type': 'application/json',
        }
      }).then((res) => res.json()).then((data) => { return data; }).catch((error) => { return []; })
    }


  return {
    props: {
      profile: profile,
      classes: classes,
      session: session
    }
  }
}





