import { FlatList, View, StyleSheet } from 'react-native';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const ReviewListContainer = ({ reviews, myReviews }) => {
  const reviewNodes = reviews
    ? reviews.edges?.map((edge) => edge.node)
    : [];

  const renderItem = ({ item }) => {
    return <ReviewItem review={item} myReviews={myReviews} />
  }

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
}

export const ReviewList = ({ reviews, myReviews = false }) => {
  return (
    <ReviewListContainer
      reviews={reviews}
      myReviews={myReviews}
    />
  );
};

export default ReviewList;