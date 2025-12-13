import { FlatList, View, StyleSheet } from "react-native";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

// myReviews = true kun listataan omat arvostelut
export const ReviewListContainer = ({
  listHeaderComponent,
  reviews,
  onEndReach,
  myReviews }) => {
  const reviewNodes = reviews
    ? reviews.edges?.map((edge) => edge.node)
    : [];

  const renderItem = ({ item }) => {
    return <ReviewItem review={item} myReviews={myReviews} />;
  };

  return (
    <FlatList
      ListHeaderComponent={listHeaderComponent}
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      renderItem={renderItem}
    />
  );
};

export const ReviewList = ({
  listHeaderComponent,
  reviews,
  onEndReach,
  myReviews = false }) => {
  return (
    <ReviewListContainer
      listHeaderComponent={listHeaderComponent}
      reviews={reviews}
      myReviews={myReviews}
      onEndReach={onEndReach}
    />
  );
};

export default ReviewList;