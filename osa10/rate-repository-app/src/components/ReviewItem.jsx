import { View, Pressable, StyleSheet, Alert, Platform } from 'react-native';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-native';
import useDeleteReview from '../hooks/useDeleteReview';
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
  buttonsContainer: {
    flexDirection: 'row',
  },
  reviewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 50/2,
  },
  reviewText: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  repoButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#10c36cff',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  deleteButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#eb0707ff',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  }
});

const useAlert = () => {
  const message = "Are you sure you want to delete the review?";
  
  return new Promise((resolve) => {
    if (Platform.OS === "web") {
      resolve(window.confirm(message));
    } else {
      Alert.alert(
        "Confirm review delete",
        message,
        [
          { text: 'Cancel', onPress: () => resolve(false) },
          { text: 'OK', onPress: () => resolve(true) }
        ],
      );
    }
  });
};

const ReviewItem = ({review, myReviews = false}) => {
  const navigate = useNavigate();
  const [deleteReview] = useDeleteReview();

  const handleDelete = async (reviewId) => {
    const confirm = await useAlert();
    if (confirm) { await deleteReview(reviewId) };
  }

  const createdDate = parseISO(review.createdAt);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.reviewContainer}>
          <Text fontWeight='bold' style={styles.reviewText}>{review.rating}</Text>
        </View>

        <View style={styles.contentContainer}>
          {!myReviews &&
            <View>
              <Text fontWeight='bold'>{review.user?.username}</Text>
            </View>
          }

          {myReviews &&
            <View>
              <Text fontWeight='bold'>{review.repository?.fullName}</Text>
            </View>
          }

          <View>
            <Text>{format(createdDate, 'dd.MM.yyyy')}</Text>
          </View>
          
          <View>
            <Text>{review.text}</Text>
          </View>
        </View>
      </View>

      {myReviews &&
        <View style={styles.buttonsContainer}>
          <Pressable
            onPress={() =>{
              review.repositoryId && navigate(`/repository/${review.repositoryId}`)
            }}
            style={styles.repoButton}>
            <Text color='textWhite'>Open repository</Text>
          </Pressable>
          <Pressable
            onPress={() =>{
              handleDelete(review.id);
            }}
            style={styles.deleteButton}>
            <Text color='textWhite'>Delete review</Text>
          </Pressable>
        </View>
      }
      </View>
  )
}

export default ReviewItem;