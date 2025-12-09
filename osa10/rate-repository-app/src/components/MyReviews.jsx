import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";
import ReviewList from "./ReviewList";
import Text from "./Text";

const MyReviews = () => {
  const { data, loading, error } = useQuery(ME, {
    variables: { includeReviews: true}
  });
  if (loading) return <Text>Loading reviews...</Text>
  if (error) return <Text>Error: {error.message}</Text>
  if (!data?.me?.reviews?.edges?.length) {
    return <Text> No reviews found. </Text>
  }
  return <ReviewList reviews={data.me?.reviews} myReviews/>;
};

export default MyReviews;