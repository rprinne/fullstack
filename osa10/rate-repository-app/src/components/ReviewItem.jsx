import { View, StyleSheet } from 'react-native';
import { format, parseISO } from 'date-fns';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  topContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  contentContainer: {
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
  },
  reviewContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    marginRight: 20,
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 50/2,
  },
  reviewText: {
    textAlign: 'center',
    textAlignVertical: 'center',
  }
});

const ReviewItem = ({review}) => {
  const createdDate = parseISO(review.createdAt)
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.reviewContainer}>
          <Text fontWeight='bold' style={styles.reviewText}>{review.rating}</Text>
        </View>

        <View style={styles.contentContainer}>
          <View>
            <Text fontWeight='bold'>{review.user?.username}</Text>
          </View>

          <View>
            <Text>{format(createdDate, 'dd.MM.yyyy')}</Text>
          </View>
          
          <View>
            <Text>{review.text}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default ReviewItem;