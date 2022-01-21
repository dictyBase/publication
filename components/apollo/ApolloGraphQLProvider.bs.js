// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var React = require("react");
var Apollo = require("./apollo.bs.js");
var Client = require("@apollo/client");

function ApolloGraphQLProvider(Props) {
  var children = Props.children;
  return React.createElement(Client.ApolloProvider, {
              client: Apollo.client,
              children: children
            });
}

var make = ApolloGraphQLProvider;

exports.make = make;
/* react Not a pure module */
