import { gql } from "@apollo/client";
export const RepositoryDetails = gql`
  fragment RepositoryDetails on Repository {
    id
    fullName
    ownerAvatarUrl
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    url
  }
`;

export const UserDetails = gql`
  fragment UserDetails on User {
    id
    username
  }
`;

export const ReviewDetails = gql`
  fragment ReviewDetails on Review {
    id
    text
    rating
    createdAt
    repositoryId
    repository {
      fullName
    }
    user {
      ...UserDetails
    }
  }${UserDetails}
`;

export const PageInfoDetails = gql`
  fragment PageInfoDetails on PageInfo {
    endCursor
    startCursor
    hasNextPage
  }
`;