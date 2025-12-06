import { Image, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { openURL } from 'expo-linking';
import Text from './Text';
import ReviewList from './ReviewList';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  topContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  avatarContainer: {
    flexGrow: 0,
    marginRight: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  contentContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  languageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#0366d6',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  languageText: {
    fontColor: 'white',
  },
  countItem: {
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,

  },
  countItemCount: {
    marginBottom: 5,
  }
});

const formatNumber = (number) => {
  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}k`;
  }
  return String(number)
}

const CountItem = ({ label, count }) => {
  return (
    <View style={styles.countItem}>
      <Text style={styles.countItemCount} fontWeight="bold">
        {formatNumber(count)}
      </Text>
      <Text color="textSecondary">{label}</Text>
    </View>
  )
}

// Käytetään listassa
export const RepositoryItemContainer = ({ item, ...props }) => {
  const navigate = useNavigate();
  return (
    <Pressable onPress={() => {item.id && navigate(`/${item.id}`)}}>
      <RepositoryItem item = {item} singleView={false}/>
    </Pressable>
  )
}

// Käytetään yhden repon sivulla
export const RepositoryItem = ({ item, singleView, ...props }) => {

  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
        </View>
        <View style={styles.contentContainer}>
          <Text fontWeight='bold'>{item.fullName}</Text>
          <Text>{item.description}</Text>
          <View style={styles.languageContainer}>
            <Text color='textWhite'>{item.language}</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <CountItem count={item.stargazersCount} label="Stars" />
        <CountItem count={item.forksCount} label="Forks" />
        <CountItem count={item.reviewCount} label="Reviews" />
        <CountItem count={item.ratingAverage} label="Rating" />
      </View>

      {singleView &&
        <Pressable
          onPress={()=>{item.url && openURL(item.url)}}
          style={styles.languageContainer}>
          <Text color='textWhite'>Open in Github</Text>
        </Pressable>
      }
      {singleView &&
        <ReviewList reviews={item.reviews} />
      }

    </View>
  );
};