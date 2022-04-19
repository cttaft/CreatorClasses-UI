
import { Image, Spinner } from "react-bootstrap";
import { FunctionComponent, useState } from "react";
import { CreatorProfile } from "../types/CreatorProfile";
import { Session } from "next-auth";

type Props = {
    initialImageSrc: string | undefined,
    session : Session
}

const UploadProfileImage: FunctionComponent<Props> = ({ initialImageSrc, session }) => {

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

    return (
        <>
            {imageLoading ? (
                <Spinner animation="border" ></Spinner>
            ) : (
                <div>
                    <h4>Upload Profile Picture</h4>
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

export default UploadProfileImage;



