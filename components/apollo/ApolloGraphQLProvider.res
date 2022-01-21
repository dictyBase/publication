@react.component
let make = (~children: React.element) => {
  <ApolloClient.React.ApolloProvider client=Apollo.client>
    {children}
  </ApolloClient.React.ApolloProvider>
}