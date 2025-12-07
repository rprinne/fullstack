import { useApolloClient, useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';
import useAuthStorage from './useAuthStrorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    try {
      const { data } = await mutate({
        variables: {
          credentials: { username, password },
        },
      });
      await authStorage.setAccessToken(data?.authenticate?.accessToken);
      const savedToken = await authStorage.getAccessToken();
      console.log("tallennettu token:", savedToken);
      apolloClient.resetStore();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return [signIn, result];
};

export default useSignIn;