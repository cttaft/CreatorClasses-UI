import { Navbar, NavDropdown, Container, Nav } from "react-bootstrap";
import Link from 'next/link'
import { useSession  } from 'next-auth/react'

type LayoutProps = {
    children: React.ReactNode,
    sess : 123
  };

const Layout: FunctionComponent = ({children} : LayoutProps) => {
   
    const {data: session, status} = useSession();

    let loginString = "Sign In";
    let loginHref = "/api/auth/signin";
    if(session)
    {
    
        loginString = 'Sign Out';
        loginHref = '/api/auth/signout';
    }
    return(
        <Container>
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Creator Classes</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/student/dashboard"><a class="nav-link">Dashboard</a></Link>
            </Nav>
            <Nav className="me-auto">
                <Link href={`${loginHref}`}>
                <a class="nav-link">{loginString}</a></Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        {children}
    </Container>

    )
}

export default Layout;



