import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from '../context/UserContext';
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps }: AppProps) {
  return (<> <SessionProvider
    session={pageProps.session}
  > <Component {...pageProps} /></SessionProvider></>)
}

export default MyApp
