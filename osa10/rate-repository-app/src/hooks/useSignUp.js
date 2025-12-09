import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

const useCreateUser = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const addUser = async ({ username, password }) => {
    const result = await mutate({
      variables: {
        user: { username, password },
      },
    });
    return result ? result : undefined;
  };

  return [addUser, result];
};

export default useCreateUser;