import Constants from 'expo-constants';
import { Image, View, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  topRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  languageBox: {
    alignSelf: 'flex-start',
    backgroundColor: '#0366d6',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  languageText: {
    fontColor: 'white',
  }
});

const formatNumber = (number) => {
  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}k`;
  }
  return String(number)
}

const RepositoryItem = ({ item, ...props }) => {

  return (
    <View style={styles.container}>

      <View style={styles.topRow}>
        <Image
          style={styles.avatar}
          source={{ uri: item.ownerAvatarUrl }}
        />
        <View style={{ flex: 1 }}>
          <Text fontWeight='bold'>Full name: {item.fullName}</Text>
          <Text>Description: {item.description}</Text>
          <View style={styles.languageBox}>
            <Text color='textWhite'>{item.language}</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <View>
          <Text fontWeight="bold">{formatNumber(item.stargazersCount)}</Text>
          <Text>Stars</Text>
        </View>
        <View>
          <Text fontWeight="bold">{formatNumber(item.forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View>
          <Text fontWeight="bold">{item.reviewCount}</Text>
          <Text>Reviews</Text>
        </View>
        <View>
          <Text fontWeight="bold">{item.ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;