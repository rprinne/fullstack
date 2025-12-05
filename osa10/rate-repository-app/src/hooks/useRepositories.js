import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  console.log("from query", data)

  return { repositories: data ? data.repositories : undefined, ...result };
};

export default useRepositories;