import { StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import Text from './Text';

import useRepository from '../hooks/useRepository';
import { RepositoryItem } from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const SingleRepositoryPage = () => {
  const { repoId } = useParams();
  const { repository, loading, error } = useRepository(repoId);

  if (loading) {
    return <Text>Loading...</Text>
  }
  if (error) {
    return <Text>Error loading the repository</Text>
  }
  if (!repository) {
    return <Text> No repository found with the id {repoId} </Text> 
  }
  return <RepositoryItem item = {repository} singleView={true}/>
}

export default SingleRepositoryPage;