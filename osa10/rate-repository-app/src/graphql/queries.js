import { gql } from "@apollo/client";
import { RepositoryDetails, ReviewDetails, PageInfoDetails } from "./fragments";

export const GET_REPOSITORIES = gql`
  query Repositories(
    $first: Int
    $after: String
    $orderBy: AllRepositoriesOrderBy!
    $orderDirection: OrderDirection!
    $searchKeyword: String!
  ) {
    repositories(
      first: $first
      after: $after
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          ...RepositoryDetails
        }
      }
      pageInfo {
        ...PageInfoDetails
      }
    }
  }
  ${RepositoryDetails}
  ${PageInfoDetails}
`;

export const GET_REPOSITORY = gql`
  query Repository(
  $repositoryId: ID!
  $first: Int
  $after: String
  ) {
    repository(id: $repositoryId) {
      ...RepositoryDetails
      reviews(
        first: $first
        after: $after
      ) {
        edges {
          node {
            ...ReviewDetails
          }
          cursor
        }
        pageInfo {
          ...PageInfoDetails
        }
      }
    }
  }
  ${RepositoryDetails}
  ${ReviewDetails}
  ${PageInfoDetails}
`;

export const ME = gql`
  query Me(
    $includeReviews: Boolean = false
    $first: Int
    $after: String
  ) {
    me {
      id
      username
      reviews(
        first: $first
        after: $after
      ) @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewDetails
          }
        }
        pageInfo {
          ...PageInfoDetails
        }
      }
    }
  }
  ${ReviewDetails}
  ${PageInfoDetails}
`;