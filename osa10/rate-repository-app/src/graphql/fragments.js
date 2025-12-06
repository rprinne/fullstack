import { gql } from '@apollo/client';
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
`

export const ReviewDetails = gql`
  fragment ReviewDetails on Review {
    id
    text
    rating
    createdAt
    user {
      id
      username
    }
  }
`