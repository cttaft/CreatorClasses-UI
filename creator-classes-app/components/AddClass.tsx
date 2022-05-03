import { FunctionComponent, useState } from "react";
import { Button, Modal, InputGroup, FormControl, Form, Container, Row, Card } from 'react-bootstrap';
import { CreatorClass } from "../types/CreatorClass";
import {Video} from "../types/Video"
import { Session } from "next-auth";
import UploadClassImage from "./UploadClassImage";
import Router from "next/router";

interface Props {
    creatorId : number
    session : Session
    classes : CreatorClass[]
}

const AddClass: FunctionComponent<Props> = ({creatorId, session, classes}) => {
    const [creatorsClasses, setCreatorsClasses] = useState(classes);
    const [show, setShow] = useState(false);
    const [className, setClassName] = useState("");
    const [classDescription, setClassDescription] = useState("");
    const [selectedClass, setSelectedClass] = useState<CreatorClass | null>(null);
    const [classId, setClassId] = useState(0);
    const [showVideo, setShowVideo] = useState(false);
    const [videoName, setVideoName] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [vidDescription, setVidDescription] = useState("");
    const [vidLength, setVidLength] = useState(0);

    const getClasses = async() =>
    {
        return await fetch(`https://creator-classes-experience-api.azurewebsites.net/classes/byCreator/${creatorId}`,
        {
          headers: {
            'Content-type': 'application/json',
          }
        }).then((res) => res.json()).then((data) => { return data; }).catch((error) => { return []; })
    }

    const handleClose = async() => {
        setSelectedClass(null);
        setCreatorsClasses(await getClasses());
        setShow(false);
    };

    const handleCloseVideo = async() => {
        setShowVideo(false);
    };
    const handleShow = async(classId : number) => { 
        if(classId > 0)
        {
            var classResponse : CreatorClass = await fetch(`https://creator-classes-experience-api.azurewebsites.net/classes/${classId}`, {
                method: "GET"
            }).then(res => res.json()).then(data => {return data;});
            setSelectedClass(classResponse);
            setClassName(classResponse.className);
            setClassDescription(classResponse.classDescription);
            setClassId(classId);
        }
        setShow(true);
       
    };

    const handleShowVideo = (classId : number) =>
    {
        setClassId(classId);
        setShowVideo(true); 
    }

    const createClass= async() => {
        const classToCreate = new CreatorClass(classId > 0 ? classId : -1, className, "", classDescription, [], creatorId);
        const body = JSON.stringify(classToCreate);
        const classIdResult : number = await fetch("https://creator-classes-experience-api.azurewebsites.net/classes", {
            method: "POST",
            headers: {
              'Authorization': `Bearer ${session!.accessToken}`,
              'Content-Type' : 'application/json'
            },
            body
          }).then(res => res.json()).then(data => {return data.Id;});
          handleClose();
    }

    
    const createVideo= async() => {
            const video = new Video(-1, videoName, vidDescription, videoUrl, vidLength);
            const body = JSON.stringify(video);
            await fetch(`https://creator-classes-experience-api.azurewebsites.net/classes/${classId}/videos`, {
                method: "POST",
                headers: {
                  'Authorization': `Bearer ${session!.accessToken}`,
                  'Content-Type' : 'application/json'
                },
                body
              });
        
          handleClose();
          Router.reload();
          
    }


    return (

        <>

        <Container fluid>
                <Row className ="justify-content-md-center">
                    {creatorsClasses.map(cardClass => (
                        <Card key={cardClass.classId} style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={cardClass.classImage} style={{ height: '12rem'}} />
                            <Card.Body>
                                <Card.Title>{cardClass.className}</Card.Title>
                                <Card.Text>
                                    {cardClass.classDescription}
                                </Card.Text>
                                <Button variant="primary" onClick={async () => {handleShow(cardClass.classId)}}>Edit Class </Button>
                                <Button variant="secondary" onClick={async () => {handleShowVideo(cardClass.classId)}}>Add video</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </Row>
            </Container>
            <Button variant="primary" onClick={async(e) => {await handleShow(-1);}}>
                Add Class
            </Button>

          
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add/Edit Class</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup>
                    <InputGroup.Text id="className">Class Name</InputGroup.Text>
                    <FormControl
                    placeholder="Awesome class!"
                    aria-label="ClassName"
                    aria-describedby="className"
                    value={className}
                    onChange={(e)=> setClassName(e.target.value)}
                    />
                    </InputGroup>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} value={classDescription} onChange={(e)=> setClassDescription(e.target.value)} />
                </Modal.Body>
                {selectedClass ? (
                <UploadClassImage initialImageSrc={selectedClass.classImage} session={session} classId={selectedClass.classId}></UploadClassImage>
                ) : (<></>) }
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={createClass}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showVideo} onHide={handleCloseVideo}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Video</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup>
                    <InputGroup.Text id="videoName">Video Name</InputGroup.Text>
                    <FormControl
                    placeholder="Awesome video!"
                    aria-label="VideoName"
                    aria-describedby="videoName"
                    value={videoName}
                    onChange={(e)=> setVideoName(e.target.value)}
                    />
                    </InputGroup>
                    <Form.Label>Link</Form.Label>
                    <Form.Control  value={videoUrl} onChange={(e)=> setVideoUrl(e.target.value)} />
                    <Form.Label>Description</Form.Label>
                    <Form.Control  value={vidDescription} onChange={(e)=> setVidDescription(e.target.value)} />
                    <Form.Label>Length</Form.Label>
                    <Form.Control  value={vidLength} onChange={(e)=> setVidLength(parseInt(e.target.value))} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseVideo}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={createVideo}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}
export default AddClass;