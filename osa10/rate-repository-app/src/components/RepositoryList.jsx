import { FlatList, View, StyleSheet } from 'react-native';

import useRepositories from '../hooks/useRepositories';
import { RepositoryItemContainer } from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});


export const RepositoryListContainer = ({ repositories }) => {
  const ItemSeparator = () => <View style={styles.separator} />;
  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges?.map((edge) => edge.node)
    : [];
  
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <RepositoryItemContainer item = {item} singleView={false}/>
      )}
    />
  );
}

export const RepositoryList = () => {
  const { repositories } = useRepositories();
  
  return (
    <RepositoryListContainer
      repositories={repositories}
    />
  );
};

export default RepositoryList;