import { FlatList, View, StyleSheet } from 'react-native';
import ReviewItem from './ReviewItem';
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const ReviewListContainer = ({ reviews }) => {
  const ItemSeparator = () => <View style={styles.separator} />;
  // Get the nodes from the reviews array
  const reviewNodes = reviews
    ? reviews?.edges?.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <ReviewItem review={item}/>
      )}
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