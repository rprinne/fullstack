import { FlatList, View, StyleSheet } from 'react-native';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;
const renderItem = ({ item }) => <ReviewItem review={item}/>
export const ReviewListContainer = ({ reviews }) => {
  const reviewNodes = reviews
    ? reviews.edges?.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
}

export const ReviewList = ({ reviews }) => {
  return (
    <ReviewListContainer
      reviews={reviews}
    />
  );
};

export default ReviewList;