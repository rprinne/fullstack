import { gql } from '@apollo/client';
import { RepositoryDetails, ReviewDetails } from './fragments';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ...RepositoryDetails
        }
      }
    }
  }
  ${RepositoryDetails}
`

export const GET_REPOSITORY = gql`
  query ($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepositoryDetails
      reviews {
        edges {
          node {
            ...ReviewDetails
          }
        }
      }
    }
  }
  ${RepositoryDetails}
  ${ReviewDetails}
`

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`