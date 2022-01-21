import { Container, makeStyles, Theme } from "@material-ui/core"
import {
  convertFooterData,
  FooterItems,
  footerLinks,
  footerURL,
} from "common/utils/footerItems"
import {
  formatNavbarData,
  navbarItems,
  NavbarItems,
  navbarURL,
} from "common/utils/navbarItems"
import {
  headerItems,
  loggedHeaderItems,
  HeaderLinks,
} from "components/layout/HeaderItems"
import { useFetch } from "dicty-hooks"
import { Navbar } from "dicty-components-navbar"
import { Footer, Header } from "dicty-components-header-footer"
import { footerTheme, headerTheme, navTheme } from "common/utils/themes"
import ErrorBoundary from "components/errors/ErrorBoundary"

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  body: {
    fontSize: "16px",
    color: "#333",
    backgroundColor: "#fff",
    "& h1, h2, h3, h4, h5, h6": {
      fontWeight: 500,
      lineHeight: 1.1,
    },
    "& h4, h5, h6": {
      marginTop: theme.spacing(1.2),
      marginBottom: theme.spacing(1.2),
    },
  },
}))

interface Props {
  children: React.ReactNode
}

const AppLayout = ({ children }: Props) => {
  const navbar = useFetch<NavbarItems>(navbarURL, navbarItems)
  const footer = useFetch<FooterItems>(footerURL, footerLinks)
  const classes = useStyles()

  const isAuthenticated = false

  const headerContent = isAuthenticated ? loggedHeaderItems : headerItems

  return (
    <div className={classes.body}>
      <Header items={headerContent} render={HeaderLinks} theme={headerTheme} />
      <Navbar items={formatNavbarData(navbar.data)} theme={navTheme} />
      <main className={classes.main}>
        <Container>
          <ErrorBoundary>{children}</ErrorBoundary>
        </Container>
      </main>
      {footer.data?.data && (
        <Footer
          links={convertFooterData(footer.data.data)}
          theme={footerTheme}
        />
      )}
    </div>
  )
}

export default AppLayout
