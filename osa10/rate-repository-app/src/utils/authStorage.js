import AsyncStorage from '@react-native-async-storage/async-storage';
// https://react-native-async-storage.github.io/2.0/Usage/

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  };

  async getAccessToken() {
    // Get the access token for the storage
    try {
      const token = await AsyncStorage.getItem(
        `${this.namespace}:accessToken`,
      );
      return token;
    } catch(error) {
      console.log('tuli virhe', error);
    }
  };

  async setAccessToken(accessToken) {
    // Add the access token to the storage
    try {
      await AsyncStorage.setItem(
        `${this.namespace}:accessToken`,
        accessToken
      );
    } catch(error) {
      console.log(error);
    }
  };

  async removeAccessToken() {
    // Remove the access token from the storage
    try {
      await AsyncStorage.removeItem(
        `${this.namespace}:accessToken`
      );
    } catch (error) {
      console.log(error);
    }
  };

};

export default AuthStorage;