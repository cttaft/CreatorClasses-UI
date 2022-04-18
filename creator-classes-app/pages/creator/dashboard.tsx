import { GetServerSideProps, NextPage } from "next";
import ClassList from "../../components/ClassList";
import { useSession, getSession } from 'next-auth/react'
import { CreatorClass } from "../../types/CreatorClass";
import { CreatorProfile } from "../../types/CreatorProfile";
import { FormEvent, FormEventHandler, useState } from "react";
import { Container, FormGroup, Image, Form, Button, Spinner } from 'react-bootstrap';



interface Props {
  profile: CreatorProfile
};

const CreatorDashboard: NextPage<Props> = ({ profile }) => {

  const { data: session, status } = useSession({ required: true });

  const [image, setImage] = useState<File | null>(null);
  const [createObjectURL, setCreateObjectURL] = useState<string | undefined>(profile?.imageSrc);
  const [description, setDescription] = useState<string>(profile?.description);
  const [name, setName] = useState<string>(profile?.name);
  const [youtube, setYoutube] = useState<string>(profile?.youtubeUrl);
  const [imageLoading, setImageLoading] = useState<boolean>(false);



  const uploadToClient = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i!);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async () => {
    setImageLoading(true);
    const body = new FormData();
    body.append("file", image!);
    await fetch("https://creator-classes-experience-api.azurewebsites.net/creatorProfile/Picture", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${session!.accessToken}`,
      },
      body
    });
    const updated = await fetch("https://creator-classes-experience-api.azurewebsites.net/creatorProfile", {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${session!.accessToken}`,
      }
    });
    const updatedProf: CreatorProfile = await updated.json();
    setCreateObjectURL(updatedProf.imageSrc);
    setImageLoading(false);
  };

  const updateProfile = async (event: FormEvent<HTMLFormElement>) => {
    const cc = new CreatorProfile(0, name, "", description, youtube);
    const body = JSON.stringify(cc);
    console.log(body);
    await fetch("https://creator-classes-experience-api.azurewebsites.net/creatorProfile", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${session!.accessToken}`,
        'Content-Type' : 'application/json'
      },
      body
    });
    
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
          {imageLoading ? (
              <Spinner animation="border" ></Spinner>
              ) : (
                <div>
            <h4>Upload Profile Picture</h4>
            <Image fluid src={createObjectURL} thumbnail/>
            <input type="file" name="myImage" onChange={uploadToClient} />
            <button
              className="btn btn-primary"
              type="submit"
              onClick={uploadToServer}
            >
              Upload
            </button>
            </div>
          )}
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
        classes: []
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


  return {
    props: {
      profile: profile
    }
  }
}





