let getGraphQLServer = (url: string, deployEnv: string): string => {
  if deployEnv == "staging" {
    Utils.env("NEXT_PUBLIC_ALT_GRAPHQL_SERVER")
  } else {
    url
  }
}

let client = {
  let gqlEndpoint = getGraphQLServer(
      Utils.env("NEXT_PUBLIC_GRAPHQL_SERVER"),
      Utils.env("NEXT_PUBLIC_DEPLOY_ENV")
    )

  open ApolloClient
  make(
    ~cache=Cache.InMemoryCache.make(),
    ~uri=_ => gqlEndpoint,
    (),
  )
}