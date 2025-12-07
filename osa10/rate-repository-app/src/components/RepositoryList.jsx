import { FlatList, View, StyleSheet } from 'react-native';
import { useState } from 'react';
import {Picker} from '@react-native-picker/picker';

import useRepositories from '../hooks/useRepositories';
import { RepositoryItemContainer } from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});


const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
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

const sortOptions = {
  latestFirst: {orderBy: "CREATED_AT", orderDirection: "DESC"},
  highestFirst: {orderBy: "RATING_AVERAGE", orderDirection: "DESC"},
  lowestFirst: {orderBy: "RATING_AVERAGE", orderDirection: "ASC"},
}

export const RepositoryList = () => {
  const [sortKey, setSortKey] = useState("latestFirst");

  const { repositories } = useRepositories(sortOptions[sortKey]);
  
  return (
    <View style={{ flex: 1 }}>
      <Picker
        selectedValue={sortKey}
        onValueChange={(value)=>setSortKey(value)}
      >
        <Picker.Item
          label="Latest repositories"
          value="latestFirst" />
        <Picker.Item
          label="Highest rated repositories"
          value="highestFirst" />
        <Picker.Item
          label="Lowest rated repositories"
          value="lowestFirst" />
      </Picker>
      <RepositoryListContainer
        repositories={repositories}
      />
    </View>
  );
};

export default RepositoryList;