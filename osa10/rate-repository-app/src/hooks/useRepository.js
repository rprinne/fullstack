import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (repositoryId) => {
  const { data, ...result } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      repositoryId,
    }
  });

  console.log("from useRepo", data)

  return { repository: data ? data.repository : undefined, ...result };
};

export default useRepository;