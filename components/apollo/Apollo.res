let client = {
  open ApolloClient
  make(
    ~cache=Cache.InMemoryCache.make(),
    ~uri=_ => "https://ericgraphql.dictybase.dev",
    (),
  )
}