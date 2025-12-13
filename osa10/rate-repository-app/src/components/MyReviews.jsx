import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";
import ReviewList from "./ReviewList";
import { View } from "react-native";
import Text from "./Text";

const MyReviews = () => {
  const { data, loading, error } = useQuery(ME, {
    variables: { includeReviews: true}
  });
  if (loading) return <Text>Loading reviews...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!data?.me?.reviews?.edges?.length) {
    return <Text> No reviews found. </Text>;
  }

  const reviewListHeader = (
    <View>
      <Text fontWeight="bold" fontSize="subheading">
        My reviews
      </Text>
    </View>
  );

  return (
    <ReviewList
      listHeaderComponent={reviewListHeader}
      reviews={data.me?.reviews}
      onEndReach={()=>{console.log("end reached from my reviews")}}
      myReviews
    />
  );
};

export default MyReviews;