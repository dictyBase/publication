import type { AppProps } from "next/app"
import CssBaseline from "@material-ui/core/CssBaseline"
import { make as ApolloGraphQLProvider } from "components/apollo/ApolloGraphQLProvider.bs"
import Head from "next/head"
import { AuthProvider } from "components/auth/AuthStore"
import MuiProvider from "components/layout/MuiProvider"
import AppLayout from "components/layout/AppLayout"

const PublicationApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <MuiProvider>
        <CssBaseline />

        <ApolloGraphQLProvider>
          <AppLayout>
            <Head>
              <link rel="shortcut icon" href="favicon.ico" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
              />
              <meta name="theme-color" content="#000000" />

              <link rel="manifest" href="manifest.json" />

              <title>dictyBase Literature</title>
            </Head>

            <Component {...pageProps} />
          </AppLayout>
        </ApolloGraphQLProvider>
      </MuiProvider>
    </AuthProvider>
  )
}

export default PublicationApp
