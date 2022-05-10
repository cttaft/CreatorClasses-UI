import React from 'react';
import { AppProps } from 'next/app';
import { ApplicationInsights, IConfiguration, IConfig, ITelemetryItem } from '@microsoft/applicationinsights-web';
import { SeverityLevel } from '@microsoft/applicationinsights-common';
import { Session } from 'next-auth';


const IS_BROWSER = typeof window !== 'undefined';

declare global {
  interface Window {
    appInsights?: ApplicationInsights;
  }
}

export function loadAppInsights(appInsights: ApplicationInsights, session?: Session) {
  if (!appInsights) {
    return;
  }
  appInsights.loadAppInsights();
  const telemetryInitializer = (telemetry: ITelemetryItem) => {
    telemetry!.tags!['ai.cloud.role'] = window.location.origin;
  };
  appInsights.addTelemetryInitializer(telemetryInitializer);
  if (session) {
    try {
      appInsights.setAuthenticatedUserContext(session?.user?.email!, session.userId as string, true);
    } catch {
      // Do Nothing.
    }
  }
  window.appInsights = appInsights;
}

/**
 *  Initializes Application Insights, if not already initialized, with the specified app configuration, user and config.
 */
export function initializeAppInsights(props: AppProps, session?: Session, config?: IConfiguration & IConfig): void {
  // if running on the server or in dev mode, don't initialize appInsights
  if (!IS_BROWSER || process.env.NODE_ENV !== 'production') {
    return;
  }

  // if appInsights is already initialized, don't initialize again
  if (window.appInsights) {
    return;
  }
  
    if (config) {
      // If config is provided but yet an instrumentation key is provided in props, use it instead
      if (!config.instrumentationKey && props.pageProps.appInsightsInstrumentationKey) {
        config.instrumentationKey = props.pageProps.appInsightsInstrumentationKey;
      }
      const appInsights = new ApplicationInsights({ config });
      loadAppInsights(appInsights, session);
    }
    // if no config is provided, but an instrumentation key is, create a new config and use it.
    else if (!config && props.pageProps.appInsightsInstrumentationKey) {
      const appInsights = new ApplicationInsights({
        config: {
          instrumentationKey: props.pageProps.appInsightsInstrumentationKey,
        },
      });
      loadAppInsights(appInsights, session);
    }
  
}

export function trackPageView(props: AppProps) {
  if (!IS_BROWSER || !window.appInsights) {
    return;
  }

  const name = props.Component.displayName || props.Component.name || location.pathname;
  const properties = {
    route: props.router.route,
  };
  if (props.router.query) {
    for (const key in props.router.query) {
      properties[`query.${key}` as keyof typeof properties] = props.router.query[key] as string;
    }
  }
  window.appInsights.trackPageView({ name, properties });
}

interface IAppInsightsErrorBoundaryProps {
  onError: React.ComponentType<any>;
  children: React.ReactNode
}

interface IAppInsightsErrorBoundaryState {
  hasError: boolean;
}

export class AppInsightsErrorBoundary extends React.Component<
  IAppInsightsErrorBoundaryProps,
  IAppInsightsErrorBoundaryState
> {
  state = { hasError: false };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ hasError: true });
    if (!IS_BROWSER || !window.appInsights) {
      return;
    }

    window.appInsights.trackException({
      error: error,
      exception: error,
      severityLevel: SeverityLevel.Error,
      properties: errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      const { onError } = this.props;
      return React.createElement(onError);
    }

    return this.props.children;
  }
}
