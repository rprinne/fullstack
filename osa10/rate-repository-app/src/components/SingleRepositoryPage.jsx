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

  const { repository } = useRepository(repoId);
  console.log(repository)

  if (repository){
    return (
      <RepositoryItem item = {repository} singleView={true}/>
    )
  } else {
    return (
      <Text> No repository found with the id {repoId} </Text>
    )
  }
}

export default SingleRepositoryPage;