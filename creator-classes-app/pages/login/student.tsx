import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useUserContext } from "../../context/UserContext";





const StudentLogin: NextPage = () => {
    
    const { userId, login } = useUserContext();
    const [user, setUser] = useState(0);


    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

        login(user, "STUDENT");
        e.preventDefault();
        router.push(`/student/dashboard`);
    };
   
    return (<Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formUserId">
            <Form.Label>UserId</Form.Label>
            <Form.Control type="input" placeholder="Enter user Id" name="userId" onChange={(e) => setUser(parseInt(e.target.value))} />
        </Form.Group>
        <Button variant="primary" type="submit">
            Login
        </Button>
    </Form>);
};
export default StudentLogin;