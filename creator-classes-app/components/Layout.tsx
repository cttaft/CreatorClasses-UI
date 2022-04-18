import { Navbar, NavDropdown, Container, Nav } from "react-bootstrap";
import Link from 'next/link'
import { useSession  } from 'next-auth/react'
import { FunctionComponent } from "react";

type LayoutProps = {
    children: React.ReactNode
  };


  export default function Layout({ children }: LayoutProps) {
   
    const {data: session, status} = useSession();

    let loginString = "Sign In";
    let loginHref = "/api/auth/signin";
    if(session)
    {
    
        loginString = 'Sign Out';
        loginHref = '/api/auth/signout';
    }
    return(
        <Container fluid>
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Creator Classes</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/student/dashboard"><a className="nav-link">Student Dashboard</a></Link>
            </Nav>
            <Nav className="me-auto">
              <Link href="/creator/dashboard"><a className="nav-link">Creator Dashboard</a></Link>
            </Nav>
            <Nav className="me-auto">
                <Link href={`${loginHref}`}>
                <a className="nav-link">{loginString}</a></Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        {children}
    </Container>

    )
}




