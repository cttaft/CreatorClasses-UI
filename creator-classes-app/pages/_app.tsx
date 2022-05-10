import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import { SessionProvider } from "next-auth/react"
import Layout from "../components/Layout"
import { AppInsightsErrorBoundary, initializeAppInsights, trackPageView } from '../appInsights';


function MyApp({ Component, pageProps, router }: AppProps) {

  if(typeof window !== "undefined")
  {
    console.log(process.env.INSIGHTS_INSTRUMENTATIONKEY);
    initializeAppInsights({Component, pageProps, router}, pageProps.session?.user, {
      autoTrackPageVisitTime : true,
      disableFetchTracking: false,
      enableAjaxErrorStatusText : true,
      enableCorsCorrelation : true,
      enableUnhandledPromiseRejectionTracking: true,
      autoExceptionInstrumented : true,
      enableAjaxPerfTracking : true,
      isBrowserLinkTrackingEnabled : true,
      instrumentationKey : process.env.INSIGHTS_INSTRUMENTATIONKEY
    });
    trackPageView({Component, pageProps, router});
  }
  return (<> <SessionProvider session={pageProps.session} refetchInterval={5 * 60}   refetchOnWindowFocus={true}>
    <AppInsightsErrorBoundary onError = {() => <h1>the application encountered an error.</h1>}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </AppInsightsErrorBoundary>
  </SessionProvider></>)
}
export default MyApp
