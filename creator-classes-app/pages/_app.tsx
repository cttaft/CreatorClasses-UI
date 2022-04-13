import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from '../context/UserContext';
import { SessionProvider } from "next-auth/react"
import  Layout  from "../components/Layout"

function MyApp({ Component, pageProps }: AppProps) {
  return (<> <SessionProvider session={pageProps.session}> 
    <Layout>
      <Component {...pageProps} />
      </Layout>
    </SessionProvider></>)
}
export default MyApp
