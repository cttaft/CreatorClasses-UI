
import { Image, Spinner } from "react-bootstrap";
import { FunctionComponent, useState } from "react";
import { Session } from "next-auth";
import { CreatorClass } from "../types/CreatorClass";

type Props = {
    initialImageSrc: string | undefined,
    session : Session,
    classId : number | undefined
}

const UploadClassImage: FunctionComponent<Props> = ({ initialImageSrc, session, classId }) => {

    const [createObjectURL, setCreateObjectURL] = useState<string | undefined>(initialImageSrc);
    const [imageLoading, setImageLoading] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null);
    
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
        await fetch(`https://creator-classes-experience-api.azurewebsites.net/classes/${classId}/Picture`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${session!.accessToken}`,
            },
            body
        });
        const updated = await fetch(`https://creator-classes-experience-api.azurewebsites.net/classes/${classId}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${session!.accessToken}`,
            }
        });
        const updatedClass: CreatorClass = await updated.json();
        setCreateObjectURL(updatedClass.classImage);
        setImageLoading(false);
    };

    return (
        <>
            {imageLoading ? (
                <Spinner animation="border" ></Spinner>
            ) : (
                <div>
                    <h4>Class Image</h4>
                    <Image fluid src={createObjectURL} thumbnail />
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
        </>
    )
}

export default UploadClassImage;



