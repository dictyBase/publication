import type { AppProps } from "next/app"
import CssBaseline from "@material-ui/core/CssBaseline"
import { make as App } from "components/apollo/App.bs"
import Head from "next/head"
import { AuthProvider } from "components/auth/AuthStore"
import MuiProvider from "components/layout/MuiProvider"

const PublicationApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <MuiProvider>
        <CssBaseline />

        <App>
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
        </App>
      </MuiProvider>
    </AuthProvider>
  )
}

export default PublicationApp
