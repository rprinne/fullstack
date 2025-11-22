import Constants from 'expo-constants';

import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  link: {
    marginRight: 20,
  }
});

const AppBar = () => {
  return (
    <Pressable>
      <View style={styles.container}>
        <ScrollView horizontal>
          <Link to="/" style={styles.link}>
            <Text color='textWhite'>Repositories</Text>
          </Link>
          <Link to="/signin" style={styles.link}>
            <Text color='textWhite'>Sign in</Text>
          </Link>
          <Link to="/bmi" style={styles.link}>
            <Text color='textWhite'>BMI</Text>
          </Link>
          <Link to="/signin" style={styles.link}>
            <Text color='textWhite'>Sign in</Text>
          </Link>
          <Link to="/signin" style={styles.link}>
            <Text color='textWhite'>Sign in</Text>
          </Link>
          <Link to="/signin" style={styles.link}>
            <Text color='textWhite'>Sign in</Text>
          </Link>
          <Link to="/signin" style={styles.link}>
            <Text color='textWhite'>Sign in</Text>
          </Link>
          <Link to="/signin" style={styles.link}>
            <Text color='textWhite'>Sign in</Text>
          </Link>
          <Link to="/signin" style={styles.link}>
            <Text color='textWhite'>Sign in</Text>
          </Link>
          <Link to="/signin" style={styles.link}>
            <Text color='textWhite'>Sign in</Text>
          </Link>
          <Link to="/signin" style={styles.link}>
            <Text color='textWhite'>Sign in</Text>
          </Link>
          <Link to="/signin" style={styles.link}>
            <Text color='textWhite'>Sign in</Text>
          </Link>
          <Link to="/signin" style={styles.link}>
            <Text color='textWhite'>Sign in</Text>
          </Link>
          <Link to="/signin" style={styles.link}>
            <Text color='textWhite'>Sign in</Text>
          </Link>
        </ScrollView>
      </View>
    </Pressable>
  )
};

export default AppBar;