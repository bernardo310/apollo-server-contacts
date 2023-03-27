import gql from "graphql-tag";

export default gql`
  type Query {
    contactByName(name: String!): Contact
    contactByNumber(number: String!): Contact
    contacts: [Contact]
    contactsByName(name: String!): [Contact]
    contactsByNumber(number: String!): [Contact]
  }

  type Mutation {
    createContact(name: String!, number: String!): Contact!
    deleteContact(name: String, number: String): Boolean!
  }

  type Contact @key(fields: "number") {
    name: String!
    number: String!
  }
`;