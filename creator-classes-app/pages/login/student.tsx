import { NextPage } from "next";
import Link from "next/link";

const StudentLogin: NextPage = () => {
    return (<Link href="/api/auth/signin">Sign In</Link>);
};
export default StudentLogin;