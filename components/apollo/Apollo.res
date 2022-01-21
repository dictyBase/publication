let client = {
  open ApolloClient
  make(
    ~cache=Cache.InMemoryCache.make(),
    ~uri=_ => Utils.Env.getVariable("NEXT_PUBLIC_GRAPHQL_SERVER"),
    (),
  )
}