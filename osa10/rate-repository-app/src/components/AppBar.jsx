import Constants from 'expo-constants';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

import { useQuery, useApolloClient } from '@apollo/client';
import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStrorage';

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
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  
  const { data } = useQuery(ME);
  console.log("yritetään hakea ME", data);
  let loggedIn = false;
  loggedIn = !data?.me ? false : true;
  
  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  }
  
  return (
    <Pressable>
      <View style={styles.container}>
        <ScrollView horizontal>
          <Link to="/" style={styles.link}>
            <Text color='textWhite'>Repositories</Text>
          </Link>
          {loggedIn &&
            <Link to="/review" style={styles.link}>
              <Text color='textWhite'>Reviews</Text>
            </Link>
          }
          {loggedIn && 
            <Pressable onPress={signOut}>
              <Text color="textWhite">Sign out, logged in as {data?.me?.username}</Text>
            </Pressable>
          }
          {!loggedIn && 
            <Link to="/signin" style={styles.link}>
              <Text color='textWhite'>Sign in</Text>
            </Link>
          }
          {!loggedIn && 
            <Link to="/signup" style={styles.link}>
              <Text color='textWhite'>Sign up</Text>
            </Link>
          }
        </ScrollView>
      </View>
    </Pressable>
  )
};

export default AppBar;