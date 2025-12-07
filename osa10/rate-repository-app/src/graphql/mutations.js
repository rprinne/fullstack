import { gql } from '@apollo/client';
import { ReviewDetails, UserDetails } from './fragments';

export const SIGN_IN = gql`
  mutation Authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken,
      user {
        ...UserDetails
      }
    }
  }${UserDetails}
`

export const CRAETE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      ...ReviewDetails
    }
  }${ReviewDetails}
`

export const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      ...UserDetails
    }
  }${UserDetails}
`